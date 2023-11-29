import { JwtAdapter, envs } from "../../config";
import { EmailService } from "../../presentation/services/email.service";
import { CustomHttpErrors, listErrors } from "../errors";




export class SendEmailUseCase {
   constructor(
      private readonly emailService: EmailService,
      private readonly jwtAdapter: JwtAdapter
   ){}

   async validationEmail(to: string): Promise<boolean> {
      try{
	 const token = await this.jwtAdapter.generate({email: to});
	 const htmlToValidateEmail = `
	    <h1>Validate your email</h1>
	    <p>Click the following link to validate your email</p>
	    <a>${envs.WEBSERVICE}/auth/validat/${token}</a>
	 `

	 const isSent = await this.emailService.sendEmail({
	    to,
	    html: htmlToValidateEmail,
	    subject: 'Validate your email'
	 });
	 if(!isSent) throw CustomHttpErrors.badRequest(listErrors.EMAIL_NOT_SEND)

	 return true
      }catch(error) {
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR);
      }
   }
}
