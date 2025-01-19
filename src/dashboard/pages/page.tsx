import React, { type FC } from 'react';
import { dashboard } from '@wix/dashboard';
import { WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { AdditionalFee } from '../../types';
import { WixPatternsProvider } from '@wix/patterns/provider';
import { CollectionPage } from '@wix/patterns/page';
import {
  CustomColumns,
  PrimaryActions,
  Table,
  useOptimisticActions,
  useTableCollection
} from '@wix/patterns';
import { httpClient } from '@wix/essentials';
// import { additionalFees } from '../../consts';

const FeesTable: FC = () => {
  const state = useTableCollection<AdditionalFee>({
    queryName: 'fees-table',
    itemKey: (item) => item.id,
    fetchData: async () => {
      // return {items: additionalFees, total: additionalFee.length}
      const response = await httpClient.fetchWithAuth(
        `${import.meta.env.BASE_API_URL}/additional-fees`
      );

      const data = await response.json();
      // console.log(data);

      return {
        items: data,
        total: data.length
      };
    }
  });

  const optimisticActions = useOptimisticActions(state.collection);

  const addAdditionalFee = (fee: AdditionalFee) => {
    optimisticActions.createOne(fee, {
      submit: async () => {
        await httpClient.fetchWithAuth(
          `${import.meta.env.BASE_API_URL}/additional-fees`,
          {
            method: 'POST',
            body: JSON.stringify(fee)
          }
        );
        return [fee];
      },
      successToast: `${fee.name} was succesfully added`
    });
  };

  return (
    <CollectionPage>
      <CollectionPage.Header
        title={{ text: 'Addtional Fees' }}
        primaryAction={
          <PrimaryActions
            label='Add Fee'
            onClick={() => {
              dashboard.openModal('90917990-601b-4532-b825-8d5586a3e46b', {
                addAdditionalFee
              });
            }}
          />
        }
      />
      <CollectionPage.Content>
        <Table
          state={state}
          customColumns={<CustomColumns />}
          columns={[
            { title: 'Name', id: 'name', render: (fee) => fee.name },
            {
              title: 'Description',
              id: 'description',
              render: (fee) => fee.description
            },
            {
              title: 'Collection',
              id: 'collection',
              render: (fee) => fee.collection?.name
            },
            { title: 'price', id: 'price', render: (fee) => `$${fee.price}` },
            {
              title: '# of products',
              id: 'products',
              render: (fee) => fee.collection?.numberOfProducts || 0
            }
          ]}
        />
      </CollectionPage.Content>
    </CollectionPage>
  );
};

const Index: FC = () => {
  return (
    <WixPatternsProvider>
      <WixDesignSystemProvider features={{ newColorsBranding: true }}>
        <FeesTable />
      </WixDesignSystemProvider>
    </WixPatternsProvider>
  );
};

export default Index;
