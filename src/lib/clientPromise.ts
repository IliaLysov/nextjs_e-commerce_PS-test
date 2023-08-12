import mongoose from "mongoose";

const uri = process.env.MONGODB_URI as string
const options = {}

declare global {
  var _mongoClientPromise: Promise<mongoose.mongo.MongoClient>;
}

class Singleton {
  private static _instance: Singleton;
  private client: mongoose.mongo.MongoClient;
  private clientPromise: Promise<mongoose.mongo.MongoClient>;
  private constructor() {
      this.client = new mongoose.mongo.MongoClient(uri, options);
      this.clientPromise = this.client.connect();
      if (process.env.NODE_ENV === 'development') {
          global._mongoClientPromise = this.clientPromise;
      }
  }

  public static get instance() {
      if (!this._instance) {
          this._instance = new Singleton();
      }
      return this._instance.clientPromise;
  }
}
const clientPromise = Singleton.instance;


export default clientPromise;