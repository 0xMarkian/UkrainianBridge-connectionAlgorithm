import xlsx from 'xlsx'

const iterateEvenly = (array, callback, initialValue = []) => {
  const iter = (i, acc) => {
    if(i >= array.length) return acc
    return iter(i+2, callback([ array[i], array[i+1] ], acc) )
  }

  return iter(0, initialValue)
}

const storeConsts = (...args) => args[args.length-1](...args.slice(0, args.length))


export default class Form {
  static regions = [
    ['Зак', 'Ів','Черн', 'Ль', 'Те', 'Хм', 'Рі', 'Во'],
    ['Жи', 'Ки', 'Че', 'Су'],
    ['Ві', 'Черк', 'По', 'Кр', 'Дн' ],
    ['Ха', 'Лу', 'До'],
    ['Од', 'Ми', 'Хе', 'Зап'],
    ['Кр'],
    ['не в Україні'],
  ]
  constructor({ excelData, reservePerson }) {
    this.excelData = excelData
    this.reservePerson = reservePerson
  }

  static formStateToRegionMapper = (persons, stateKeyName) => {
    const stateToRegionIndexMapper = {}

    //filtering
    persons.forEach( (person,i) => stateToRegionIndexMapper[person[stateKeyName]] = null)

    Object.keys(stateToRegionIndexMapper).forEach( state => {
      Form.regions.forEach( ( region, i ) => {
        region.forEach( stateShortName => 
          state.indexOf(stateShortName) > -1 ? stateToRegionIndexMapper[state] = i : null 
        )
      })
    })

    return stateToRegionIndexMapper
  }

  static sortByRegion = persons => persons.sort( ({ region: regionA },{ region: regionB }) => regionA < regionB ? -1 : regionA === regionB ? 0 : 1) 
  static sortByActivism = persons => persons.sort( ({ activist: activistA }, { activist: activistB }) => 
    activistA && !activistB ? -1 : 1
  )

  makePersonsAmountEven = persons => persons.length % 2 === 0 ? persons : [...persons, this.reservePerson]
  
  mapPersonsKeys = ( 
    persons, 
    mapper = { 
      email: 'Ваш E-mail', 
      activist: 'Чи залучені Ви у громадську діяльність/Вовлечены ли Вы в общественную деятельность',
    },
  ) => persons.map( person => ({ 
    ...person, 
    email: person[mapper.email],
    activist: !!(person[mapper.activist].indexOf('Так') > -1)
  }))

  getPersonsFromExel = () => {
    const { fileName, sheetName } = this.excelData

    const workbook = xlsx.readFile(fileName)
    const worksheet = workbook.Sheets[sheetName]

    return xlsx.utils.sheet_to_json(worksheet)
  }

  separateByActivism = unsortedPersons => {
    const persons = Form.sortByActivism(unsortedPersons) 
    const firstNotActivist = persons.findIndex( ({ activist }) => !activist)

    const distributionPoint = firstNotActivist % 2 === 0 ? firstNotActivist : firstNotActivist +1

    return { activists: persons.slice(0, distributionPoint), notActivists: persons.slice(distributionPoint) }
  }

  injectRegionNumbers = persons => {
    const { stateKeyName } = this.excelData
    const stateToRegionIndexMapper = Form.formStateToRegionMapper(persons, stateKeyName)
    return persons.map( person => ({ ...person, region: stateToRegionIndexMapper[person[stateKeyName]] }))
  }

  separateByRegions = unsortedPersons => {
    const persons = Form.sortByRegion(this.injectRegionNumbers(unsortedPersons))

    const latestRegion = persons[persons.length -1].region

    const gen = (region, persons) => {
      if(region === latestRegion) return [persons]
      const nextRegionFirstEl = persons.findIndex( person => person.region === region+1 )

      return [ persons.slice(0, nextRegionFirstEl), ...gen(region + 1, persons.slice(nextRegionFirstEl)) ]
    }
    return gen(0, persons)
  }
  generatePairsFromRegions = regions => {
    if(regions.length === 0) return []
    if(regions.length === 1) return iterateEvenly(regions[0], ([ a,b ], acc) => [...acc, [a, b] ] )

    const [smallestRegion, ...restRegions] = regions.sort( (regionA, regionB) => regionA.length > regionB.length  )

    const quotaPerRegion = smallestRegion.length/restRegions.length
    // console.log(smallestRegion[0] ? smallestRegion[0].region : null)
    // restRegions.forEach( region => console.log(region[0].region) )
    // console.log('\n\n')

    const regionToIndex = {}

    const pairsWithSmallestRegion = smallestRegion.map( (person, i) => storeConsts( Math.floor(i/quotaPerRegion), currentRegion => {
      const currentIndex = i - Math.ceil( currentRegion*quotaPerRegion )
      regionToIndex[currentRegion] = currentIndex
      return [person, restRegions[currentRegion][currentIndex] ]
    }
    ))

    const filteredRegions = restRegions.map( (region, i) => region.slice(regionToIndex[i]+1 || 0) ).filter( region => !( region.length === 0 ) )
    return [ ...pairsWithSmallestRegion, ...this.generatePairsFromRegions(filteredRegions)] 

  }

  generatePairs = () => {
    const { activists, notActivists } = this.separateByActivism(
      this.mapPersonsKeys(this.makePersonsAmountEven( this.getPersonsFromExel() ))
    )
    const { activistsRegions, notActivistsRegions } = { 
      activistsRegions: this.separateByRegions(activists), 
      notActivistsRegions: this.separateByRegions(notActivists)
    }

    return [ ...this.generatePairsFromRegions(activistsRegions), ...this.generatePairsFromRegions(notActivistsRegions)]
  }
}
