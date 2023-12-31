import * as env from 'env-var';

export const envs = {
   PORT: env.get('PORT').required().asPortNumber(),
   
   DATABASE_URL: env.get('DATABASE_URL').required().asString(),
   POSTGRES_USER: env.get('POSTGRES_USER').required().asString(),
   POSTGRES_DB: env.get('POSTGRES_DB').required().asString(),
   POSTGRES_PASSWORD: env.get('POSTGRES_PASSWORD').required().asString(),
   
   SECRETJWT: env.get('SECRETJWT').required().asString(),
   GOOGLE_CLIENT_ID: env.get('GOOGLE_CLIENT_ID').required().asString(),

   MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
   MAILER_MAIL: env.get('MAILER_MAIL').required().asString(),
   MAIL_SECRET_PASS: env.get('MAIL_SECRET_PASS').required().asString(),
   WEBSERVICE: env.get('WEBSERVISE').required().asString(),

   CLOUDINARY_KEY: env.get('CLOUDINARY_KEY').required().asString(),
   CLOUDINARY_SECRET_KEY: env.get('CLOUDINARY_SECRET_KEY').required().asString(),
   CLOUDINARY_NAME: env.get('CLOUDINARY_NAME').required().asString(),
}
