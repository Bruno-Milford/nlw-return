import nodemailer from 'nodemailer';

import { MailAdapter, sendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1de1376bd6b194",
    pass: "cc856dc5775fee"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: sendMailData) {
    await transport.sendMail({
      from: 'Equipe Fedget <oi@gmail.com>',
      to: 'Bruno M <bm33518@gmail.com>',
      subject,
      html: body
    });
  };
}