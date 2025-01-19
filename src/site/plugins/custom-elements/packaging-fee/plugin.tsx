import React, { useEffect, useState, type FC } from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import styles from './plugin.module.css';
import { AdditionalFee } from '../../../../types';
import { httpClient } from '@wix/essentials';

type Props = {
  productId: string;
};

// To learn more about "Old Product page" go to our docs: https://wix.to/awqi86g
const CustomElement: FC<Props> = ({ productId }) => {
  const [additionalFee, setAddtionalFee] = useState<AdditionalFee>();

  useEffect(() => {
    async function getAddtionalFee() {
      const additionalFeeResponse = await httpClient.fetchWithAuth(
        `${import.meta.env.BASE_API_URL}/product-fee?productId=${productId}`
      );
      const additionalFeeData = await additionalFeeResponse.json();

      setAddtionalFee(additionalFeeData);
    }

    getAddtionalFee();
  }, []);

  return (
    <div className={styles.root}>
      <p className={styles.badge} style={{ backgroundColor: '#f9e3aa' }}>
        {/* {additionalFee?.name} */}
        Packaging Fee
      </p>
      <p
        style={{ color: '#8c8a9a' }}
      >{`An Additional Packaging Fee will be added at checkout`}</p>
    </div>
  );
};

const customElement = reactToWebComponent(
  CustomElement,
  React,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ReactDOM as any,
  {
    props: {
      productId: 'string'
    }
  }
);

export default customElement;
