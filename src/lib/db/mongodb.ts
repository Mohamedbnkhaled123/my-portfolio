import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Prevent multiple instances of MongoClient in development due to HMR
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
