import {Response, Request} from 'express';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../model/post';
import User from '../model/user';
import ERRORS from '../errors/dicErrors';
import { destroyCloudinaryImg, uploadImgCloudinary } from '../helpers/';

cloudinary.config({
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET_KEY,
	cloud_name: process.env.CLOUDINARY_NAME
});

// interface Ifile {
// 	name: string,
// 	tempFilePath: string
// }

class UploadsController {
	uploadImg = async(req: Request, res: Response) => {
		const file: any = req.files ? req.files.file : '';
		const { collection, id } = req.params;
		
		let model, folder: string;
		
		switch (collection) {
			case 'users':
				folder = 'users-img';
				model = await User.findById(id);

				if( !model ) return res.status(404).json({ msg: ERRORS.ID_NOT_IN_USE })
			break;
			
			case 'posts':
				folder = 'posts-img';
				model = await Post.findById(id);

				if( !model ) return res.status(404).json({ msg: ERRORS.ID_NOT_IN_USE })
			default: return res.status(500).json({ msg: 'fuera' });
		}

		if( model.img ) {
            // Borra de cloudinary la img antigua
			const img = await destroyCloudinaryImg(model.img, folder);
        }

		try{
			const img = await uploadImgCloudinary( file.tempFilePath, folder );
			model.img = img;

			await model.save();

			res.json( model );		
		}catch(error){
			console.log(error);
			res.status(500).json({ msg: ERRORS.SYSTEM_ERROR });
		}
	}
}

export default UploadsController;