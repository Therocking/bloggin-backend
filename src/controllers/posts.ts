import {Request, Response} from 'express';
import Post from '../model/post';
import ERRORS from '../errors/dicErrors';

class PostsController {
    getPosts = async(req: Request, res: Response) => {
        const {limit, offset} = req.query;
        const query = {status: true}

        try {
            const [total, posts] = await Promise.all([
                Post.countDocuments(query),
                Post.find(query)
                .skip(Number( offset ))
                .limit(Number( limit ))
		        .populate('user_id', 'name')
		        // .populate('comment_id')
            ]);

            res.json({
                total,
                posts
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: ERRORS.SYSTEM_ERROR });
        }
    }

    createPost = async(req: Request, res: Response) => {
        const {status, created_at, updated_at, creator, img, ...data} = req.body;

        try {
            const postData = {
                ...data,
                user_id: req.user.id
            }

            const post = new Post(postData);
            await post.save();

            res.status(201).json( post );
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: ERRORS.SYSTEM_ERROR });
        }
    }

    updatePost = async(req: Request, res: Response) => {
        const {status, created_at, updated_at, creator, img, ...data} = req.body;
        const {id} = req.params;

        try {
            const postInfo = {
                ...data,
                updated_at: Date.now()
            }
            
            const post = await Post.findByIdAndUpdate(id, postInfo, {new: true});

            res.json(post);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: ERRORS.SYSTEM_ERROR });
        }
    }

    deletePost = async(req: Request, res: Response) => {
        const {id} = req.params;

        try {
            const post = await Post.findByIdAndUpdate(id, {status: true}, {new: true});

            res.json( post );
        } catch (error) {
            console.log(error);
        }
    
}
}

export default PostsController;
