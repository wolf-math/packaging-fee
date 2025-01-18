/**
This file allows you to call backend APIs from your frontend of this app.
You can generate various API methods including GET, POST, PUT, and DELETE.
To learn more, check out our documentation: https://wix.to/Iabrrso

Here's how you can call your API from your frontend code:

import { httpClient } from '@wix/essentials';

function MyComponent() {
  const callMyBackend = async () => {
    const res = await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/product-fee`);
    console.log(await res.text());
  };

  return <button onClick={callMyBackend}>Call backend GET function</button>;
};
*/

import { products } from '@wix/stores';
import { additionalFees } from '../../../consts';

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const productId = searchParams.get('productId') ?? '';

  console.log('PRODUCTID', productId);

  const { product } = await products.getProduct(productId);

  console.log('product', product);

  const fees = additionalFees.find((fee) =>
    product?.collectionIds.includes(fee.collectionId)
  );
  console.log('API FILE', Response.json(fees));

  return Response.json(fees);
}

// export async function POST(req: Request) {
//   const data = await req.json();
//   console.log('Log POST with body:', data);
//   return Response.json(data);
// };
