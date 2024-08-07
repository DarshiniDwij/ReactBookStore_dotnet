import React from 'react';
import { Toast } from 'react-bootstrap';

const ToastComponent = ({ showToast, setShowToast, message, variant }) => {
  const toggleShowToast = () => setShowToast(!showToast);

  return (
    <Toast show={showToast} onClose={toggleShowToast} delay={3000} autohide bg={variant}>
      <Toast.Header>
        <strong className="me-auto">{variant === 'success' ? 'Success' : 'Error'}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default ToastComponent;
