import { collections } from '@wix/stores';

export type AdditionalFee = {
  id: string;
  name: string;
  description: string;
  price: string;
  collectionId?: string;
  collection?: collections.Collection;
};
