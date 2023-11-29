import nodemailer, { Transporter } from "nodemailer"


interface SendMailOptions {
   to: string | string[]
   subject: string
   html: string
}

interface EmailServiceOptions {
   mailerService: string
   mailerMail: string
   senderEmailPassword: string
}

export class EmailService {
   private transport: Transporter; 

   constructor(opts: EmailServiceOptions){

      this.transport = nodemailer.createTransport({
	 service: opts.mailerService,
	 auth: {
	    user: opts.mailerMail,
	    pass: opts.senderEmailPassword
	 }

      });
   }

   async sendEmail(opts: SendMailOptions): Promise<boolean> {
      try{
	 const { to, subject, html } = opts;

	 await this.transport.sendMail({
	    to,
	    subject,
	    html
	 });

	 return true
      }catch(error) {
	 console.log(`Email service error:`, error)
	 return false
      }
   }
}
