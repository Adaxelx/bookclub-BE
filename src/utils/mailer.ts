import nodemailer from 'nodemailer'
import {UserDTO} from '../core/User'

export const sendRegisterEmail = async (user: UserDTO) => {
  let testAccount = await nodemailer.createTestAccount()

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: user.email,
    subject: `Utworzono konto BookClub`,
    text: 'Witamy!',
    html: `<div>
            <h1>Witaj ${user.name}!</h1>
            <p>Utworzyłeś konto w aplikacji BookClub! Miłego użytkowania!</p>
        </div>`,
  })

  console.log('Message sent: %s', info.messageId)

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
