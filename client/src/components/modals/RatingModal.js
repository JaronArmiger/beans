import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  StarOutlined,
} from '@ant-design/icons';

const RatingModal = ({ children }) => {
  const user = useSelector(state => state.user);
  const history = useHistory();
  const params = useParams();
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({ 
        pathname: '/login',
        state: {
          from: `/product/${params.slug}`
        }
      });
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