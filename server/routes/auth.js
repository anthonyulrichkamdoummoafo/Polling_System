import express from "express"
import {User} from "../models/user.js"
import joi from "joi";
import bcrypt from "bcrypt";

const Route = express.Router();
Route.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });

        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password." });

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password." });

        const token = user.generateAuthToken();
        res.status(200).send({ token: token, message: "Login Successful.",value:user });

    } catch (error) {
        return res.status(200).send({ message: "Internal Server Error." });
    }
});

const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password")
    });
    return schema.validate(data);
}

export default Route