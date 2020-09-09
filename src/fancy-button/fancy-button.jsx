import React from 'react';
import styles from './fancy-button.scss'

const FancyButton = ({ label, callback }) => (
    <button className={styles.button} onClick={callback}>{label}</button>
);

export default FancyButton;
