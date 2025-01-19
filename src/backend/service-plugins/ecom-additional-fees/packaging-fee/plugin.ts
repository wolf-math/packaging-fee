import { additionalFees } from '@wix/ecom/service-plugins';

additionalFees.provideHandlers({
  calculateAdditionalFees: async (payload) => {
    const { request, metadata } = payload;
    // Use the `request` and `metadata` received from Wix and
    // apply custom logic.
    return {
      // Return your response exactly as documented to integrate with Wix.
      // Return value example:
      additionalFees: [
        {
          code: 'packaging-fee',
          name: 'Packaging Fee',
          price: '10',
          taxDetails: {
            taxable: true
          }
        }
      ],
      currency: 'USD'
    };
  }
});
