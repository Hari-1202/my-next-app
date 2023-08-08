import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(uri, options);


async function connectDatabase() {
    await client.connect();
    return client.db("EventBooking");
}

export { connectDatabase };