import { collections } from '@wix/stores';

export type PackingFee = {
  name: string;
  description: string;
  price: string;
  collectionId: string;
  collection: collections.Collection;
};
