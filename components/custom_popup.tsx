import React from 'react';
import styles from './CustomPopup.module.css';

interface CustomPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <p>Please RSVP first</p>
        <button onClick={onConfirm}>OK</button>
      </div>
    </div>
  );
};

export default CustomPopup;