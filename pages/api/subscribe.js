import { PrismaClient } from '@prisma/client';
// import nodemailer from 'nodemailer';
import { SMTPClient } from 'emailjs';

const prisma = new PrismaClient();


export default async function handler(req, res) {
    if (req.method === 'POST') {
        return await createInquiry(req, res);
    }
    else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

async function createInquiry(req, res) {
    const body = req.body;

    const client = new SMTPClient({
        user: process.env.USER_MAIL,
        password: process.env.PASSWORD_MAIL,
        host: 'smtp.gmail.com',
        ssl:true
      });

    try {
        const newEntry = await prisma.users.create({
            data: {
                name: body.name,
                email: body.email,
            }
        });

        client.send(
            {
                from: 'jessandro42@gmail.com',
                to: body.email,
                subject: `Obrigado por assinar a minha Newsletter`,
                text: `Espero enviar algum conteudo toda terça!`,
                html: '<div>Espero enviar algum conteudo toda terça!</div>'
            }
            )



        // const transporter = nodemailer.createTransport({
        //     port: 587,
        //     host: process.env.SMTP_SERVER,
        //     auth: {
        //       user: process.env.USER_MAIL,
        //       pass: process.env.PASSWORD_MAIL,
        //     },
        //     ssl:true
        // });
        // const mailData = {
        //     from: 'jessandro42@gmail.com',
        //     to: body.email,
        //     subject: `Obrigado por assinar a minha Newsletter`,
        //     text: 'Compre uma kombi',
        //     html: '<div>Espero enviar algum conteudo toda terça!</div>'
        //    }
        //   transporter.sendMail(mailData, function (err, info) {
        //     if(err)
        //       console.log(err)
        //     else
        //       console.log(info)
        //   })

        return res.status(200).json(newEntry, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating question", success:false });
    }
}