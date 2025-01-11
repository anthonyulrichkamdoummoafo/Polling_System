import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import joi from "joi";
import passwordComplexity from "joi-password-complexity";

const userSchema = new mongoose.Schema({
    firstname: {type: String,required: true},
    lastname: {type: String,required: true},
    email: {type: String,required: true},
    password: {type: String,required: true},
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.SECRET, {expiresIn: '10d'});
    return token;
}

const User = mongoose.model('User', userSchema);

const validate = (data) => {
    const schema = joi.object({
        firstname: joi.string().required().label('First Name'),
        lastname: joi.string().required().label('Last Name'),
        email: joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password')
    });
    return schema.validate(data)
}

export {User, validate};