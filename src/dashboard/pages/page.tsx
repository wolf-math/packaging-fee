import React, { type FC } from 'react';
import { dashboard } from '@wix/dashboard';
import { WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { PackingFee } from '../../types';
import { WixPatternsProvider } from '@wix/patterns/provider';
import { CollectionPage } from '@wix/patterns/page';
import {
  CustomColumns,
  PrimaryActions,
  Table,
  useOptimisticActions,
  useTableCollection
} from '@wix/patterns';
import { packingFees } from '../../consts';
import { httpClient } from '@wix/essentials';

const FeesTable: FC = () => {
  const state = useTableCollection<PackingFee>({
    queryName: 'fees-table',
    fetchData: async () => {
      const response = await httpClient.fetchWithAuth(
        `${import.meta.env.BASE_API_URL}/packing-fees`
      );

      const data = await response.json();

      return {
        items: data,
        total: data.length
      };
    },
    itemKey: (item) => item.id
  });

  const actions = useOptimisticActions(state.collection);

  const addPackingFee = (fee: PackingFee) => {
    actions.createOne(fee, {
      submit: async () => {
        packingFees.push(fee);
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
                addPackingFee
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
            { title: 'price', id: 'price', render: (fee) => fee.price },
            {
              title: '# of products',
              id: 'products',
              render: (fee) => fee.collection?.numberOfProducts
            }
          ]}
        />
      </CollectionPage.Content>
    </CollectionPage>
  );
};

const Index: FC = () => {
  const addPackingFee = (fee: PackingFee) => {
    console.log(fee);
  };

  return (
    <WixPatternsProvider>
      <WixDesignSystemProvider features={{ newColorsBranding: true }}>
        <FeesTable />
      </WixDesignSystemProvider>
    </WixPatternsProvider>
  );
};

export default Index;
