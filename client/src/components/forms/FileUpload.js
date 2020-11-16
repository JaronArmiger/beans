import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const FileUpload = ({
  values,
  setValues,
  setLoading,
}) => {
  const { token } = useSelector(state => state.user);

  const fileUploadAndResize = (e) => {
    const files = e.target.files;
    const allUploadedFiles = values.images;

    if (files) {
      for (let i = 0; i < files.length; i++) {
      	setLoading(true);
        Resizer.imageFileResizer(
          files[i], // file
          720, // maxWidth
          720, // maxHeigh
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

  return (
    <div className="row">
      <label
        className='btn btn-primary btn-raised'
      >
        Choose Files
        <input 
          type="file"
          multiple
          hidden
          accept='images/*'
          onChange={fileUploadAndResize}
        />
      </label>
    </div>
  );
};

export default FileUpload;