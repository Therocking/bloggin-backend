"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares/");
const search_1 = __importDefault(require("../controllers/search"));
const searchController = new search_1.default();
const router = (0, express_1.Router)();
router.get('/:collection/:termino', [
    middlewares_1.validJwt,
    middlewares_1.validFields, // Valid if have any error
], searchController.search);
// The middleware **valid-fields** is reapeted so that there is only one error
exports.default = router;
//# sourceMappingURL=search.js.map