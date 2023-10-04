const { Schema, model } = require('mongoose');

const CommentSchema = Schema({
    text: {
        type: String,
        required: true
    },
    creatorUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    likes:[ 
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    answers: [this]
});

// Middleware que se ejecuta antes de guardar un comentario.
CommentSchema.pre('save', function(next) {
    // Verifica si el comentario es una respuesta por defecto.
    if (this.isNew) {
      // No es una respuesta por defecto, no hacemos nada.
      return next();
    }
  
    // Es una respuesta por defecto, establecemos la fecha de creación.
    this.creationDate = Date.now();
    next();
});

const PostSchema = Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: null
    },
    imgs: [
        {
            type: String,
            default: null
        }
    ],
    creatorUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    likes:[ 
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [CommentSchema],
    status: {
        type: Boolean,
        default: true
    }
});

PostSchema.methods.toJSON = function() {
    const { __v, ...post} = this.toObject();
    return post
}

module.exports = model('Post', PostSchema);