import Form from './src/Form.js'
import sendMails from './src/sendMails'
import reservePerson from './inputData/reservePerson'
const exelFileName = `${__dirname}/inputData/input2.xlsx`

const form = new Form({ 
  excelData: {
    fileName: exelFileName, 
    sheetName: 'Answers',
    stateKeyName: 'У якій області Ви проживаєте?/В какой области Вы проживаете?',
    emailKeyName: 'Ваша електронна пошта/Ваша електронная почта',
  }, reservePerson}
)

const pairs = form.generatePairs()

//logging
pairs.forEach(pair => { console.log(pair); console.log('\n\n')})

sendMails(pairs)
