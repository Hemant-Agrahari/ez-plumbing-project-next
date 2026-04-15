 import React from 'react';
import { BeatLoader } from 'react-spinners';
import styles from './Loading.module.scss';  

const Loader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <BeatLoader margin={5} color="#008dd2" size={13} />
    </div>
  );
};

export default Loader;
