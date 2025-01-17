/**
This file allows you to call backend APIs from your frontend of this app.
You can generate various API methods including GET, POST, PUT, and DELETE.
To learn more, check out our documentation: https://wix.to/Iabrrso

Here's how you can call your API from your frontend code:

import { httpClient } from '@wix/essentials';

function MyComponent() {
  const callMyBackend = async () => {
    const res = await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/packing-fees`);
    console.log(await res.text());
  };

  return <button onClick={callMyBackend}>Call backend GET function</button>;
};
*/

import { packingFees } from '../../../consts';
import { collections } from '@wix/stores';
import { PackingFee } from '../../../types';

const mergeFeesWithCollection = (collections: collections.Collection[]) => {
  return packingFees.map((fee) => {
    const collection = collections.find(
      (collection) => collection._id === fee.collectionId
    );

    return {
      ...fee,
      collection
    };
  });
};

export async function GET(req: Request) {
  // console.log('Log from GET.');
  // return new Response('Response from GET.');

  const collectionIds = packingFees.map((fee) => fee.collectionId);
  console.log('Collection IDs:', collectionIds);
  const collectionsResponse = await collections
    .queryCollections()
    .in('_id', collectionIds)
    .find();

  const fees: PackingFee[] = mergeFeesWithCollection(collectionsResponse.items);
  return Response.json(fees);
}

export async function POST(req: Request) {
  const data = await req.json();
  console.log('Log POST with body:', data);
  return Response.json(data);
}
