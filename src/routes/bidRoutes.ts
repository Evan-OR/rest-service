import { CompletedBid } from '@/types/requests';
import { Router } from 'express';
import { Collection } from 'mongodb';

const bidRouter = Router();

bidRouter.get('/:userId', async (req, res) => {
  const { userId } = req.params as { userId: string };

  const bidsCollection = req.app.get('bidsCollection') as Collection<CompletedBid>;

  const foundItems = await bidsCollection.find({ buyerId: userId });

  const resultsArray = [];
  for await (const doc of foundItems) {
    resultsArray.push(doc);
  }

  res.status(200).json(resultsArray);
});

export default bidRouter;
