import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL);
        const connect = mongoose.connection;
        connect.on('connected', ()=>{
            console.log("Connected to MongoDB");
        })

        connect.on('error', (error) => {
            console.log("Error connecting to MongoDB" + error);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong : " + error);
    }
}