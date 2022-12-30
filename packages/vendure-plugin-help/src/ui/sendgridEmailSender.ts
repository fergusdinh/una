import { EmailDetails, EmailSender } from '@vendure/email-plugin';

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(
  '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'
);

export class SendgridEmailSender implements EmailSender {
  async send(email: EmailDetails) {
    console.log('send-----------', email);

    await sgMail.send({
      to: email.recipient,
      from: email.from,
      subject: 'email.subject',
      html: 'asdasdasd',
    });
  }
}
