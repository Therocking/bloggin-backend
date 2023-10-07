const { request, response } = require('express');
const { SYSTEM_ERROR, USER_UNAUTHORIZED } = require('../errors/dicErrors');
const { Post } = require('../model');

//TODO: 
// agregar likes a los comentarios
// agregar el comentario nuevo con los demás
// agregar el answer nuevo con los demás
// hacer que el populate se aplique en todas las propiedades

const getPosts = async(req=request, res=response) => {
    try {
        const { limit=4, offset=0 } = req.query;
        const query = { status: true };

        const [ total, posts ] = await Promise.all([
            Post.countDocuments(query),
            Post.find(query)
            .populate('creatorUser', 'name')
            .populate('likes', 'name')
            .skip(offset)
            .limit(limit)
        ])
    
        res.json({
            total,
            posts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: SYSTEM_ERROR
        });
    }
}
const getPost = async(req=request, res=response) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId)
            .populate('creatorUser', 'name');
    
        res.json( post );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: SYSTEM_ERROR
        });
    }
}
const createPost = async(req=request, res=response) => {
    try {
        const { creatorUser, likes, coments, creationDate, ...body } = req.body;

        const data = { // Info a guardar en el modelo post
            ...body,
            creatorUser: req.user._id,
        };

        const post = new Post( data )

        await post.save();
    
        res.json( post )
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: SYSTEM_ERROR
        });
    }
}

const updatePost = async(req=request, res=response) => {
    try {
        const uid = req.user._id;
        const { creatorUser, creationDate, status, comments, likes, ...body } = req.body;
        const { postId } = req.params;

        const postDB = await Post.findById(postId); // Post en DB
        if ( postDB._id !== uid ) { // Verifica que sea el creador que quiere hacer la modificación
            return res.status(401).json({
                msg: USER_UNAUTHORIZED
            });
        }

        const post = await Post.findByIdAndUpdate( postId, body, {new: true} )
            .populate('creatorUser', 'name')
            .populate('likes', 'name')            
    
        res.json( post );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: SYSTEM_ERROR
        });
    }
}

const addLike = async(req=request, res=response) => {
    try {
        const uid = req.user._id; // Id del usuario actual
        const { postId } = req.params;
    
        let data
    
        const postDB = await Post.findById(postId); // Post en DB
        const likes = postDB.likes; // Arreglo de actual de likes
        const repitLike = likes.some( like => JSON.stringify( like ) === JSON.stringify( uid )  ); // Verifica si hay algún ObjetId igual al uid
    
        if( repitLike ) { // Si hay un ObjectId igual al uid, filtra el uid y guarda los que son diferentes
            const diffToUid = likes.filter( id => JSON.stringify(id) !== JSON.stringify( uid ))
            
            data = {
                likes: [ ...diffToUid ]
            };
    
            const post = await Post.findByIdAndUpdate( postId, data, {new: true} )
            .populate('creatorUser', 'name')
            .populate('likes', 'name');
    
            return res.json( post );
        }
    
        // Si no hay nigún ObjectId igual al uid agrega el uid
        data = {
            likes: [...postDB.likes, uid]
        };
                
        const post = await Post.findByIdAndUpdate( postId, data, {new: true} )
        .populate('creatorUser', 'name')
        .populate('likes', 'name')
    
        return res.json( post );
    } catch (error) {
     console.log(error);
     res.status(500).json({
        msg: SYSTEM_ERROR
     })   
    }
}

const addComment = async(req=request, res=response) => {
    try {
        const { postId } = req.params;
        const text = req.body.text;

        const postDB = await Post.findById(postId);

        const data = {
            comments: {
                ...postDB.comments,
                text,
                creatorUser: req.user._id,
            }
        }

        const post = await Post.findByIdAndUpdate(postId, data, {new: true})
        .populate('creatorUser', 'name')
        .populate('likes', 'name')

        res.json( post );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: SYSTEM_ERROR
        });
    }
}

const addCommentAnswer = async(req=request, res=response) => {
    try {
        const { postId } = req.params;
        const text = req.body.text;

        // const postDB = await Post.findById(postId);

        const data = {
            comments: {
                answers:{
                    text,
                    creatorUser: req.user._id,
                }
            }
        }

        const post = await Post.findByIdAndUpdate(postId, data, {new: true})
        .populate('creatorUser', 'name')
        .populate('likes', 'name')

        res.json( post );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: SYSTEM_ERROR
        });
    }
}

const deletePost = async(req=request, res=response) => {
    try {
        const { postId } = req.params;

        const post = await Post.findByIdAndUpdate( postId, {status: false}, {new: true} );
    
        res.json( post );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: SYSTEM_ERROR
        });
    }
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    addLike,
    addComment,
    addCommentAnswer,
    deletePost,
}