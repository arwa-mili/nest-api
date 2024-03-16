
import { Injectable} from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailSendingService {


    constructor(

      
      ) { }





async SendEmail(receiverEmail:string,body:string,subject:string) :Promise<void>{


const transporter = nodemailer.createTransport({

    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const mailOptions = {

    from: process.env.AUTH_EMAIL,
    to: receiverEmail,
    subject: subject,
    html: `${body}`,
};
await transporter.sendMail(mailOptions);

}
}