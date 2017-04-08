import Form from './Form.js'
import sendMails from './sendMails'
import reservePerson from './reservePerson'
import logger from './logger'

const form = new Form({ 
  excelData: {
    fileName: './inputData/input.xlsx', 
    sheetName: 'FormAnswers',
    stateKeyName: 'Фактичне місце проживання/Фактическое место жительства',
  }, reservePerson}
)


const pairs = form.generatePairs()
pairs.forEach(pair => { console.log(pair); console.log('\n\n')})
const email = 'psyhonaft0@gmail.com'
const index = pairs.findIndex( ([{ email: email1 }, { email: email2 }]) => email1 === email || email2 === email)
console.log(index)
// sendMails(pairs.slice(38))

// Одеська область
//   Дніпропетровська область	
//   Чернігівська область	
//   Харківська область
//   Житомирська область
//   Полтавська область	
//   Херсонська область
//   Київська область
//   Запорізька область	
//   Луганська область
//   Донецька область	
//   Вінницька область
//   Автономна Республіка Крим	
//   Миколаївська область	
//   Кіровоградська область
//   Сумська область
//   Львівська область	
//   Черкаська область
//   Хмельницька область	
//   Волинська область
//   Рівненська область	
//   Івано-Франківська область
//   Тернопільська область	
//   Закарпатська область	
//   Чернівецька область

