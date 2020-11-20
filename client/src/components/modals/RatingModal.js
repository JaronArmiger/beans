import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  StarOutlined,
} from '@ant-design/icons';

const RatingModal = ({ children }) => {
  const user = useSelector(state => state.user);
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push('/login');
    }
  }

  return (
    <React.Fragment>
      <div
        onClick={handleModal}
      >
      	<StarOutlined className="text-danger" />
      	<br />
      	{user ? 'Leave rating' : 'Log in to leave rating'}
      </div>
      <Modal
        title='Leave a rating'
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success('Thanks for your feedback!');
        }}
        onCancel={() => setModalVisible(false)}
      >
      	{children}
      </Modal>
    </React.Fragment>
  );
};

export default RatingModal;