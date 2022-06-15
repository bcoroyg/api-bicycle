import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BicycleSchema = new Schema({
    code: {
        type: String,
        unique: true,
    },
    color: {
        type: String
    },
    model: {
        type: String
    },
    reserved:{
        type: Boolean,
        default:false,
    },
});

const Bicycle = mongoose.model('bicycle', BicycleSchema);

export default Bicycle;