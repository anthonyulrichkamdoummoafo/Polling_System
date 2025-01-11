import mongoose from "mongoose";

 const connection = async () => {
    try {
        mongoose.connect(process.env.DB);
        console.log('Connected to database successfully');
    }catch (error) {
        console.log(error);
        console.log('Could not connect to database!');
    }
}

export default connection