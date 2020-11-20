import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  StarOutlined,
} from '@ant-design/icons';

const RatingModal = ({ children }) => {
  const user = useSelector(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <React.Fragment>
      <div
        onClick={() => setModalVisible(true)}
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