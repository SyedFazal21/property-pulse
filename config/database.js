import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if(connected == true){
        console.log('Already connected to database......');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log('Conneted to database.....');
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;