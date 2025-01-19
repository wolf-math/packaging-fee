// import { additionalFees } from '../../../../consts';
import { additionalFees as servicePlugin } from '@wix/ecom/service-plugins';
import { httpClient } from '@wix/essentials';

async function getAdditionalFees() {
  const response = await httpClient.fetchWithAuth(
    `${import.meta.env.BASE_API_URL}/additional-fees`
  );

  const data = await response.json();

  // get additional fees
  return data[0];
}

servicePlugin.provideHandlers({
  calculateAdditionalFees: async (payload) => {
    const additionalFees = await getAdditionalFees();
    return {
      additionalFees: additionalFees.map((fee: any) => ({
        code: fee.id,
        name: fee.name,
        price: fee.price,
        taxDetails: {
          taxable: true
        }
      })),
      currency: 'USD'
    };
  }
});
