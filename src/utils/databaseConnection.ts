import { MongoClient } from 'mongodb';

const getDatabaseConnection = async (connectionString: string) => {
  const client = new MongoClient(connectionString);
  await client.connect();
  return {
    usersCollection: client.db('live_streaming_db').collection('users'),
  };
};

export default getDatabaseConnection;
