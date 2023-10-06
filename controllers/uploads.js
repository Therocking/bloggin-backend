const { request, response } = require('express');
const cloudinary = require('cloudinary').v2;

const { User } = require('../model');
const { uploadImg } = require('../helpers');
const { ID_NOT_IN_USE, SYSTEM_ERROR, EXT_INVALID } = require('../errors/dicErrors');

const uploadFiles = async(req=request, res=response) => {
    try {
        
        const file = req.files.file;
        const { collection, id } = req.params;
    
        let model, folder // 'folder' es la carpeta de cloudinary donde se guardará la img
        switch (collection) {
            case 'users':
                folder =  'users-img';
                model = await User.findById(id);

                if ( !model ) {
                    return res.status(400).json({
                        msg: ID_NOT_IN_USE
                    });
                }
            break;
            case 'posts':
                folder = 'posts-img';
                model = await User.findById(id);

                if ( !model ) {
                    return res.status(400).json({
                        msg: ID_NOT_IN_USE
                    });
                }
            break;
            default: return res.status(400).json({
                msg: 'Ness'
            });
        }
    
        if( model.img ) {
            // Borra de cloudinary la img antigua
            const userImgArr = model.img.split('/');
            const nombre =  userImgArr[ userImgArr.length - 1 ] ;
            const [ img_id ] = nombre.split('.');
            await cloudinary.uploader.destroy( `${folder}/${img_id}` )
        }

        const userImg = await uploadImg( file.tempFilePath, folder );

        model.img = userImg;
        await model.save();
        
        res.json( model );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            img: SYSTEM_ERROR
        });
    }
}

module.exports = {
    uploadFiles
}
