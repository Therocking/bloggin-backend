const cloudinary = require('cloudinary').v2;

cloudinary.config({
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    cloud_name: process.env.CLOUDINARY_NAME,
});

const uploadImg = ( file, folder ) => {
    return new Promise(( resolve, reject ) => {

        if ( folder === 'users-img' ) { 
            cloudinary.uploader.upload(file, {
                 folder,
                 eager: [  
                         { width: 200, height: 150, crop: "pad" }, // Redimensiona la img
                 ],                                                                                                            
                 quality: 'auto:best'
             }).then( resp => {
                 const { secure_url } = resp.eager.find( img => img.url ) ;
                 return resolve( secure_url );
             } )
             .catch( err => reject( err ) )
        }

        //
        cloudinary.uploader.upload(file, {
            folder,
            eager: [  
                    { width: 400, height: 300, crop: "pad" }, // Redimensiona la img
            ],                                                                                                            
            quality: 'auto:best'
        }).then( resp => {
            const { secure_url } = resp.eager.find( img => img.url ) ;
            resolve( secure_url );
        } )
        .catch( err => reject( err ) )

    });
};

module.exports = {
    uploadImg
}