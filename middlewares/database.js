import { MongoClient } from 'mongodb';

let cachedClient = null;

async function database(req, res, next) {
    if(!cachedClient) {
        cachedClient = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    req.client = cachedClient;
    req.db = cachedClient.db(process.env.DB_NAME);
    
    return next();
}

export default database;