
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { emailsenddto } from '../dto/email-send.dto';


@Injectable()
export class EmailSendingService {


    constructor(


    ) { }





    async SendEmail({receiveremail, senderemail,subject, body} : emailsenddto ): Promise<void> {
        

     

        const transporter = nodemailer.createTransport({

            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: senderemail,
                pass: process.env.AUTH_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {

            from: senderemail,
            to: receiveremail,
            subject: subject,
            html: body,
        };
        await transporter.sendMail(mailOptions);

    }
}