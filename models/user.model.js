import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'
const Schema = mongoose.Schema;

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please, enter a valid email.'],
    },
    password: {
        type: String,
        required: true,
    }, 
    role:{
        type: String,
        default:"Customer"
    },
    verified: {
        type: Boolean,
        default: false
    },
    token: { 
        type: String, 
    },
});

UserSchema.plugin(uniqueValidator, { message: '{PATH} already exists.' });

UserSchema.pre('save', async function(next){
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

UserSchema.methods.toJSON = function() {
    const { _id,__v, password, token, verified, ...user} = this.toObject();
    return user;
};

const User = mongoose.model('user', UserSchema);

export default User;