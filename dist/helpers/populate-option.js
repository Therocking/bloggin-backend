"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateOption = void 0;
exports.populateOption = [
    { path: 'user_id', select: { name: 1, img: 1 } },
    { path: 'comments', select: { post_id: 0, __v: 0 }, populate: [{
                path: 'user_id', select: { name: 1, img: 1 }
            }, {
                path: 'answers', populate: [
                    { path: 'user_id', select: { name: 1, img: 1 } },
                    { path: 'answers', select: { post_id: 0, __v: 0 }, populate: { path: 'user_id', select: { name: 1, img: 1 } } }
                ]
            }]
    },
];
//# sourceMappingURL=populate-option.js.map