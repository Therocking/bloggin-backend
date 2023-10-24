import {Request, Response} from 'express';
import { Types } from 'mongoose';
import Post from '../model/post';
import { populateOption } from '../helpers';

class SearchController {
    public collectionsAllowed: string[];

    constructor() {
        this.collectionsAllowed = [ 'posts' ];
    }

    search = async (req: Request, res: Response) => {
        const { collection, termino } = req.params;
        const { offset=0, limit=5 } = req.query;

        const offsetNum = Number( offset );
        const limitNum = Number( limit );

        switch (collection) {
            case 'posts':
                this.searchPosts( termino, res, offsetNum, limitNum );    
            break;

            default: return res.status(400).json({ msg: `Colección no permitida, coleciones permitidas: ${this.collectionsAllowed}` });
        }
 
    }

    searchPosts = async( term: string, res: Response, offset: number, limit: number ) => {
        const query = {status: true};

        const isMongoId = Types.ObjectId.isValid( term );
        if ( isMongoId ) {
            const [ total, posts ] = await Promise.all([
                Post.countDocuments(query),
                Post.findById(term)
            ]);

            return res.json({
                total,
                results: (posts) ? [posts] : []
            });
        }

        const regex = new RegExp( term, 'i' );

        const [ total, posts ] = await Promise.all([
            Post.countDocuments(query),
            Post.find({ title: regex, status: true })
            .skip(offset)
            .limit(limit)
            .populate(populateOption)
        ]);

        res.json({
            total,
            results: posts
        });
    }
}

export default SearchController;