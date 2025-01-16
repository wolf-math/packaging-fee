import React, { useEffect, useState, type FC } from 'react';
import { dashboard } from '@wix/dashboard';
import {
  WixDesignSystemProvider,
  CustomModalLayout,
  InputArea,
  Dropdown,
  Layout,
  Cell,
  FormField,
  Input,
  NumberInput
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { width, height, title } from './modal.json';
import type { PackingFee } from '../../../types';
import { collections } from '@wix/stores';

type Props = {
  addPackingFee: (item: PackingFee) => void;
};

// @ts-ignore
const Modal: FC = ({ addPackingFee }) => {
  const [packingFee, setPackingFee] = useState<Partial<PackingFee>>();
  const [siteCollections, setSiteCollections] =
    useState<collections.Collection[]>();

  useEffect(() => {
    async function getCollections() {
      const response = await collections.queryCollections().find();
      setSiteCollections(response.items);
    }

    getCollections();
  }, []);

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <CustomModalLayout
        width={width}
        maxHeight={height}
        primaryButtonText='Save'
        secondaryButtonText='Cancel'
        primaryButtonOnClick={() => {
          dashboard.closeModal();
          addPackingFee(packingFee as PackingFee);
        }}
        secondaryButtonOnClick={() => dashboard.closeModal()}
        onCloseButtonClick={() => dashboard.closeModal()}
        title={title}
        subtitle='Add a packaging fee to ship this item'
        content={
          <Layout>
            <Cell>
              <Layout gap='24px'>
                <Cell>
                  <FormField label='Collection'>
                    <Dropdown
                      options={siteCollections?.map((collection) => {
                        return {
                          id: collection._id!,
                          value: collection.name
                        };
                      })}
                      onSelect={(option) =>
                        setPackingFee({
                          ...packingFee,
                          collectionId: `${option.id}`
                        })
                      }
                    />
                  </FormField>
                </Cell>
                <Cell span={6}>
                  <FormField label='name'>
                    <Input
                      value={packingFee?.name!}
                      onChange={(val) =>
                        setPackingFee({ ...packingFee, name: val.target.value })
                      }
                    />
                  </FormField>
                </Cell>
                <Cell span={6}>
                  <FormField label='Packaging Fee'>
                    <NumberInput
                      hideStepper
                      value={packingFee?.price}
                      min={0}
                      onChange={(val) =>
                        setPackingFee({ ...packingFee, price: `${val}` })
                      }
                    />
                  </FormField>
                </Cell>
                <Cell>
                  <FormField label='Description'>
                    <InputArea
                      value={packingFee?.description}
                      onChange={(val) =>
                        setPackingFee({
                          ...packingFee,
                          description: val.target.value
                        })
                      }
                    />
                  </FormField>
                </Cell>
              </Layout>
            </Cell>
          </Layout>
        }
      ></CustomModalLayout>
    </WixDesignSystemProvider>
  );
};

export default Modal;
