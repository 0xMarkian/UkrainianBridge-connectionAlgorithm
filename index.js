import Form from './Form.js'
import sendMails from './sendMails'
import reservePerson from './inputData/reservePerson'
import logger from './logger'

const form = new Form({ 
  excelData: {
    fileName: './inputData/input.xlsx', 
    sheetName: 'FormAnswers',
    stateKeyName: 'Фактичне місце проживання/Фактическое место жительства',
  }, reservePerson}
)

const pairs = form.generatePairs()

//logging
pairs.forEach(pair => { console.log(pair); console.log('\n\n')})

// sendMails(pairs.slice(131))
