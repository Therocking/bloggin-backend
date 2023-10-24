"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyCloudinaryImg = exports.uploadImgCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    cloud_name: process.env.CLOUDINARY_NAME,
});
const uploadImgCloudinary = (file, folder) => {
    return new Promise((resolve, reject) => {
        if (folder === 'users-img') {
            cloudinary_1.v2.uploader.upload(file, {
                folder,
                eager: [
                    { width: 200, height: 150, crop: "pad" }, // Redimensiona la img
                ],
                quality: 'auto:best'
            }).then(resp => {
                var _a;
                const secure_url = (_a = resp.eager.find((img) => img.url)) === null || _a === void 0 ? void 0 : _a.secure_url;
                return resolve(secure_url);
            })
                .catch(err => reject(err));
        }
        // for posts
        cloudinary_1.v2.uploader.upload(file, {
            folder,
            eager: [
                { width: 400, height: 300, crop: "pad" }, // Redimensiona la img
            ],
            quality: 'auto:best'
        }).then(resp => {
            var _a;
            const secure_url = (_a = resp.eager.find((img) => img.url)) === null || _a === void 0 ? void 0 : _a.secure_url;
            resolve(secure_url);
        })
            .catch(err => reject(err));
    });
};
exports.uploadImgCloudinary = uploadImgCloudinary;
const destroyCloudinaryImg = (cloudinaryImg, folder) => __awaiter(void 0, void 0, void 0, function* () {
    const userImgArr = cloudinaryImg.split('/');
    const nombre = userImgArr[userImgArr.length - 1];
    const [img_id] = nombre.split('.');
    yield cloudinary_1.v2.uploader.destroy(`${folder}/${img_id}`);
});
exports.destroyCloudinaryImg = destroyCloudinaryImg;
//# sourceMappingURL=cloudinary-uploads.js.map