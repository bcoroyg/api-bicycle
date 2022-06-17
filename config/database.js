import mongoose from 'mongoose';

const connectionDB = async (req, res) => {
    try {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
        });
        console.log('Connection success DB');
    } catch (error) {
        console.log('Connection failed.')
    }
}

export default connectionDB;