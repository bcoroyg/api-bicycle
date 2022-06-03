import mongoose from 'mongoose';

const connectionDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connection success DB');
    } catch (error) {
        console.log('Connection failed.')
    }
}

export default connectionDB;