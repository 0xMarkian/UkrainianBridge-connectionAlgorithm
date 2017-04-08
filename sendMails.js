const nodemailer = require('nodemailer')
const xoauth2 = require('xoauth2')

import createEmailText from './createEmailText.js'
import logger from './logger'
import credentials from './config/credentials'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: credentials.user,
      accessToken: credentials.accessToken,
    }
});

const usualTransporterCallback = email => (error, info) => {
  if (error) {
    return console.log(error);
  }
  const message = `Message ${info.messageId} sent: ${info.response} ; ${email}` 
  console.log(message);
  logger(message)
}


export default (
  pairs, 
  communicationPlatformAdress = 'https://talky.io/',
  mailOptions = {
    subject: 'Проект: Ukrainian bridge',
    attachments: [{
      filename: 'image.png',
      path: 'images/DDoqyjePaF4.jpg',
      cid: 'mainImage' //same cid value as in the html img src
    }],
  },
) => {

  const transporterCallback = (pairs, previousPersonEmail) => (error, info) => {
    if (error) {
      return console.log(error);
    }
    const message = `Message ${info.messageId} sent: ${info.response} ; ${previousPersonEmail}` 
    console.log(message)
    logger(message)

    console.log(pairs)
    if(pairs.length === 0) return
const chatAdress = `${communicationPlatformAdress}${Math.random().toString().slice(2)}`
    const [ pair, ...restPairs] = pairs

    const [person1, person2] = pair
    transporter.sendMail({ 
      ...mailOptions, 
      to: person1.email,
      html: createEmailText(person2.email, chatAdress),
    }, usualTransporterCallback(person1.email))

    transporter.sendMail({ 
      ...mailOptions, 
      to: person2.email,
      html: createEmailText(person1.email, chatAdress),

    }, transporterCallback(restPairs, person2.email))
  }

  transporterCallback(pairs, {})(null, {})
}
