import React, { type FC } from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import styles from './plugin.module.css';

type Props = {
  name: string;
};

// To learn more about "Checkout" go to our docs: https://wix.to/FPbvzSu
const CustomElement: FC<Props> = (props) => {
  return (
    <div className={styles.root}>
      <h2>Hello {props.name || 'Wix CLI'}</h2>
      <p>
        Open <code>`src/site/plugins/custom-elements/checkout-packaging-fee`</code> to start
        building your plugin
      </p>
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
      name: 'string',
    },
  }
);

export default customElement;
