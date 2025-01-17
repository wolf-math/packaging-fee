import React, { type FC } from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import styles from './plugin.module.css';

type Props = {
  name: string;
};

// To learn more about "New Product page" go to our docs: https://wix.to/VBf3XkQ
const CustomElement: FC<Props> = (props) => {
  return (
    <div className={styles.root}>
      <h2>Hello {props.name || 'Wix CLI'}</h2>
      <p>
        Open <code>`src/site/plugins/custom-elements/packing-indicator`</code> to start
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
