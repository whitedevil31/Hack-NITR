// import { MongoClient } from "mongodb";

// let client: MongoClient;
// export async function connectDB(): Promise<MongoClient> {
//     client = await MongoClient.connect(process.env.MONGO_URI || "", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
//     console.log("Hooray! 🎉🎉 Connected to Database.");
//     return client;
// }
// export async function getClient(): Promise<MongoClient> {
//     if (!client) {
//         await connectDB();
//     }
//     return client;
// }
// export default connectDB;

import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI || "",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log(`Hooray! 🎉🎉 Connected to Database.`);
    } catch (err) {
        console.log(err);
    }
};

