import React, { type FC } from 'react';
import { dashboard } from '@wix/dashboard';
import {
  Button,
  EmptyState,
  Image,
  Page,
  TextButton,
  WixDesignSystemProvider
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import * as Icons from '@wix/wix-ui-icons-common';
import wixLogo from './wix_logo.svg';
import { PackingFee } from '../../types';
import { WixPatternsProvider } from '@wix/patterns/provider';
import { CollectionPage } from '@wix/patterns/page';
import {
  CollectionPageHeader,
  CustomColumns,
  PrimaryActions,
  Table,
  useOptimisticActions,
  useTableCollection
} from '@wix/patterns';
import { packingFees } from '../../consts';

const FeesTable: FC = () => {
  const state = useTableCollection<PackingFee>({
    queryName: 'fees-table',
    // @ts-ignore
    fetchData: async () => {
      return {
        items: packingFees,
        total: packingFees.length
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
              render: (fee) => 'Collection'
            },
            { title: 'price', id: 'price', render: (fee) => fee.price },
            { title: '# of products', id: 'products', render: (fee) => 0 }
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
        {/* <Page>
          <Page.Header
            title='Dashboard Page'
            subtitle='Add management capabilities to your app.'
            actionsBar={
              <Button
                onClick={() => {
                  dashboard.openModal('90917990-601b-4532-b825-8d5586a3e46b', {
                    addPackingFee
                  });
                }}
                prefixIcon={<Icons.OrderAdd />}
              >
                Add Packing Fee
              </Button>
            }
          />
          <Page.Content>
            <EmptyState
              image={
                <Image fit='contain' height='100px' src={wixLogo} transparent />
              }
              title='Start editing this dashboard page'
              subtitle='Learn how to work with dashboard pages and how to add functionality to them using Wix APIs.'
              theme='page'
            >
              <TextButton
                as='a'
                href='https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-cli/supported-extensions/dashboard-extensions/dashboard-pages/add-dashboard-page-extensions-with-the-cli#add-dashboard-page-extensions-with-the-cli'
                target='_blank'
                prefixIcon={<Icons.ExternalLink />}
              >
                Dashboard pages documentation
              </TextButton>
            </EmptyState>
          </Page.Content>
        </Page> */}
      </WixDesignSystemProvider>
    </WixPatternsProvider>
  );
};

export default Index;
