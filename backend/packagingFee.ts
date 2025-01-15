// @ts-ignore
import wixData from 'wix-data';

const COLLECTION_NAME = 'PackagingFees';

export async function savePackingFee(packingFee) {
  try {
    return await wixData.insertOrUpdate(COLLECTION_NAME, {
      _id: 'packingFee', // Static ID for single-entry storage
      ...packingFee
    });
  } catch (error) {
    console.error('Error saving packing fee:', error);
    throw error;
  }
}

export async function fetchPackingFee() {
  try {
    return await wixData.get(COLLECTION_NAME, 'packingFee');
  } catch (error) {
    console.error('Error fetching packing fee:', error);
    return null;
  }
}
