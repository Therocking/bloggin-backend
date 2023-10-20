import mongoose from 'mongoose';

export const mongoConnection = async() => {
    try {

        await mongoose.connect( process.env.MONGO_CNN || '' );
        console.log('MongoDB connect');
    } catch (error) {
        console.log(error);
    }
}