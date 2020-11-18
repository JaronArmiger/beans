import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { 
  Avatar,
  Badge,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const FileUpload = ({
  values,
  setValues,
}) => {
  const { token } = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);

  const fileUploadAndResize = (e) => {
    const files = e.target.files;
    const allUploadedFiles = values.images;

    if (files) {
      for (let i = 0; i < files.length; i++) {
      	setLoading(true);
        Resizer.imageFileResizer(
          files[i], // file
          720, // maxWidth
          720, // maxHeight
          'JPEG', // compressFormat
          100, // quality
          0, // rotation
          (uri) => { // responseUriFunc
          	axios.post(
          	  `${process.env.REACT_APP_API}/uploadimages`,
          	  {
          	  	image: uri,
          	  },
          	  {
          	  	headers: {
          	  	  authtoken: token || '',
          	  	}
          	  }
          	).then((res) => {
              console.log('IMAGE UPLOAD RES DATA', res.data);
              setLoading(false);
              allUploadedFiles.push(res.data);

              setValues({...values, images: allUploadedFiles})
          	})
          	.catch((err) => {
          	  console.log(err);
          	  setLoading(false);
          	  toast.error(err.response.data.err);
          	})
          },
          'base64', // outputType
          // minWidth
          // minHeight
        );
      }
    }
  };

  const handleImageRemove = (public_id) => {
  	setLoading(true);
  	axios.post(
  	  `${process.env.REACT_APP_API}/removeimage`,
  	  {
  	  	public_id,
  	  },
  	  {
  	  	headers: {
  	      authtoken: token || '',
  	    },
  	  }
  	).then((res) => {
  	  setLoading(false);
  	  const { images } = values;
  	  const filteredImages = images.filter((image) => {
  	  	return image.public_id !== public_id;
  	  });
  	  setValues({ ...values, images: filteredImages });
  	})
  	.catch((err) => {
  	  console.log(err);
      setLoading(false);
      toast.error(err.response.data.err);
  	})
  }

  return (
  	<React.Fragment>
  	  {loading && <LoadingOutlined className='text-danger h1'/>}
  	 <div className="row">
  	   {values.images && values.images.map((image) => {
  	      return (
  	      	<Badge
  	      	  count='X'
  	      	  onClick={() => handleImageRemove(image.public_id)}
  	      	  key={image.public_id}
  	      	  style={{ cursor: 'pointer' }}
  	      	>
  	      	  <Avatar
  	            src={image.url}
  	            size={100}
  	            shape='square'
  	            className='ml-3'
  	          />
  	      	</Badge>
  	      );
  	   })}
  	 </div>
  	  <div className="row">
        <label
          className='btn btn-primary btn-raised'
        >
          Add Files
          <input 
            type="file"
            multiple
            hidden
            accept='images/*'
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
  	</React.Fragment>
  );
};

export default FileUpload;