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
const mongoose_1 = require("mongoose");
const post_1 = __importDefault(require("../model/post"));
const helpers_1 = require("../helpers");
class SearchController {
    constructor() {
        this.search = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { collection, termino } = req.params;
            const { offset = 0, limit = 5 } = req.query;
            const offsetNum = Number(offset);
            const limitNum = Number(limit);
            switch (collection) {
                case 'posts':
                    this.searchPosts(termino, res, offsetNum, limitNum);
                    break;
                default: return res.status(400).json({ msg: `Colección no permitida, coleciones permitidas: ${this.collectionsAllowed}` });
            }
        });
        this.searchPosts = (term, res, offset, limit) => __awaiter(this, void 0, void 0, function* () {
            const query = { status: true };
            const isMongoId = mongoose_1.Types.ObjectId.isValid(term);
            if (isMongoId) {
                const [total, posts] = yield Promise.all([
                    post_1.default.countDocuments(query),
                    post_1.default.findById(term)
                ]);
                return res.json({
                    total,
                    results: (posts) ? [posts] : []
                });
            }
            const regex = new RegExp(term, 'i');
            const [total, posts] = yield Promise.all([
                post_1.default.countDocuments(query),
                post_1.default.find({ title: regex, status: true })
                    .skip(offset)
                    .limit(limit)
                    .populate(helpers_1.populateOption)
            ]);
            res.json({
                total,
                results: posts
            });
        });
        this.collectionsAllowed = ['posts'];
    }
}
exports.default = SearchController;
//# sourceMappingURL=search.js.map