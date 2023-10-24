import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    cloud_name: process.env.CLOUDINARY_NAME,
});


export const uploadImgCloudinary = ( file: string, folder: string ): Promise<string> => {
    return new Promise(( resolve, reject ) => {

        if ( folder === 'users-img' ) { 
            cloudinary.uploader.upload(file, {
                 folder,
                 eager: [  
                    { width: 200, height: 150, crop: "pad" }, // Redimensiona la img
                 ],                                                                                                            
                 quality: 'auto:best'

             }).then( resp => {
                 const secure_url = resp.eager.find( (img: any) => img.url )?.secure_url;
                 return resolve( secure_url );
             } )
             .catch( err => reject( err ) )
        }

        // for posts
        cloudinary.uploader.upload(file, {
            folder,
            eager: [  
                { width: 400, height: 300, crop: "pad" }, // Redimensiona la img
            ],                                                                                                            
            quality: 'auto:best'

        }).then( resp => {
            const secure_url = resp.eager.find( (img: any) => img.url )?.secure_url;
            resolve( secure_url );
        } )
        .catch( err => reject( err ) )

    });
};

export const destroyCloudinaryImg = async( cloudinaryImg: string, folder: string ) => {
    const userImgArr = cloudinaryImg.split('/');
    const nombre =  userImgArr[ userImgArr.length - 1 ] ;
    const [ img_id ] = nombre.split('.');
    await cloudinary.uploader.destroy( `${folder}/${img_id}` )
}