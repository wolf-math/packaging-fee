import { additionalFees } from '@wix/ecom/service-plugins';

// Temporary in-memory storage (replace with persistent storage in production)
let feesData = [
  {
    id: '1',
    code: 'packaging-fee',
    name: 'Packaging Fee',
    price: 10,
    taxDetails: { taxable: true }
  }
];

// Register handlers
additionalFees.provideHandlers({
  // @ts-ignore
  getAdditionalFees: async () => {
    // Return all additional fees
    return feesData;
  },
  // @ts-ignore
  addAdditionalFee: async (fee) => {
    // Add a new fee to the data
    feesData.push(fee);
    return fee;
  }
});
