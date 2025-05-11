import { User } from '@/types/User';
import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';
import { Collection } from 'mongodb';

dotenv.config();
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

const uploadUserProfilePic = async (req, res) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient('images');
  // @ts-ignore
  const image = req.files?.image;
  const email = req.body.email;

  if (!image) return res.status(400).send('No image uploaded');

  const blobName = email;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.upload(image.data, image.data.length, {
      blobHTTPHeaders: { blobContentType: image.mimetype },
    });

    const url = blockBlobClient.url;
    console.log(url);
    res.json({ url });

    const usersCollection = req.app.get('usersCollection') as Collection<User>;
    usersCollection.updateOne({ email: email }, { $set: { profilePic: url } });
  } catch (err) {
    console.error('Azure upload error:', err);
    res.status(500).json({ error: 'Failed to upload to Azure' });
  }
};

export { uploadUserProfilePic };
