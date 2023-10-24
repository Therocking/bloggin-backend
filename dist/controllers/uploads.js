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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const post_1 = __importDefault(require("../model/post"));
const user_1 = __importDefault(require("../model/user"));
const dicErrors_1 = __importDefault(require("../errors/dicErrors"));
const helpers_1 = require("../helpers/");
cloudinary_1.v2.config({
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    cloud_name: process.env.CLOUDINARY_NAME
});
// interface Ifile {
// 	name: string,
// 	tempFilePath: string
// }
class UploadsController {
    constructor() {
        this.uploadImg = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const file = req.files ? req.files.file : '';
            const { collection, id } = req.params;
            let model, folder;
            switch (collection) {
                case 'users':
                    folder = 'users-img';
                    model = yield user_1.default.findById(id);
                    if (!model)
                        return res.status(404).json({ msg: dicErrors_1.default.ID_NOT_IN_USE });
                    break;
                case 'posts':
                    folder = 'posts-img';
                    model = yield post_1.default.findById(id);
                    if (!model)
                        return res.status(404).json({ msg: dicErrors_1.default.ID_NOT_IN_USE });
                default: return res.status(500).json({ msg: 'fuera' });
            }
            if (model.img) {
                // Borra de cloudinary la img antigua
                const img = yield (0, helpers_1.destroyCloudinaryImg)(model.img, folder);
            }
            try {
                const img = yield (0, helpers_1.uploadImgCloudinary)(file.tempFilePath, folder);
                model.img = img;
                yield model.save();
                res.json(model);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: dicErrors_1.default.SYSTEM_ERROR });
            }
        });
    }
}
exports.default = UploadsController;
//# sourceMappingURL=uploads.js.map