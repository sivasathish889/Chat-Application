import { createTransport } from "nodemailer";

interface mailProps {
  to: string;
  subject: string;
  text?: string;
}

interface sendMailType extends mailProps {
  from: string;
  html?: string;
}

const sendMail = async ({ to, subject, text }: mailProps) => {
  const transport = createTransport({
    port: Number(process.env.SMTP_PORT),
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const mailOptions: sendMailType = {
    from: process.env.MAIL_USER as string,
    to: to,
    subject: subject,
    text: text,
  };
  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default sendMail;
