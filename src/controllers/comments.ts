import {Request, Response} from 'express';
import Comment from '../model/comment';
import Post from '../model/post';
import ERRORS from '../errors/dicErrors';

class CommentController {
    getCommets = async(req: Request, res: Response) => {
        const comments = await Comment.find()
            .populate('answers')
        res.json(comments)
    }

    createComment = async(req: Request, res:Response) => {
        const {user_id, post_id, created_at, updated_at, comment_parent_id, answers, ...data} = req.body;
        const { postId } = req.params;

        try {
            const postComments = await Post.findById(postId);
       
            const commentInfo = {
                ...data,
                post_id: postId,
                user_id: req.user.id 
            }
            
            const comment = new Comment(commentInfo);
            
            postComments?.comments.push( comment.id );
            // const postInfo = {
            //     comments: postComments?.comments.push(comment.id)
            // }
    
            const [c, post] = await Promise.all([
                comment.save(),
                // Post.findByIdAndUpdate(postId, postInfo, {new: true})
                postComments?.save()
            ]);
    
            res.status(201).json( c );
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: ERRORS.SYSTEM_ERROR });
        }
    }

    addAnswer = async(req: Request, res: Response) => {
        const {user_id, post_id, created_at, updated_at, comment_parent_id, answers, ...data} = req.body;
        const {commentId, postId} = req.params;

        try {
         
            const commentInfo = {
                ...data,
                user_id: req.user.id,
                post_id: postId,
                comment_parent_id: commentId
            }
    
            let comment = new Comment(commentInfo);
    
            const commentParentInfo = {
                answers: comment.id
            }
                  
            const [c, cp] = await Promise.all([
                comment.save(),
                Comment.findByIdAndUpdate(commentId, commentParentInfo, {new: true} )
            ]);
    
            res.json( c );
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: ERRORS.SYSTEM_ERROR });
        }
    }

    updateComment = async(req: Request, res: Response) => {
        const {user_id, post_id, created_at, updated_at, comment_parent_id, answers, ...data} = req.body;
        const {commentId} = req.params;

        try {
            const commentInfo = {
                ...data,
                updated_at: Date.now()
            }

            const comment = await Comment.findByIdAndUpdate( commentId, commentInfo, {new: true} );

            res.json( comment );
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: ERRORS.SYSTEM_ERROR });
        }
    }
}

export default CommentController;