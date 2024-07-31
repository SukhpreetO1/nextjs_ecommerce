import mongoose from "mongoose";

export function connect() {
    try {
        mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
        const database_connection = mongoose.connection;
        database_connection.on('connected', ()=>{
            console.log("Connected to MongoDB");
        })

        database_connection.on('error', (error) => {
            console.log("Error connecting to MongoDB" + error);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong : " + error);
    }
}