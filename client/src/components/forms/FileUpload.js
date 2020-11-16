import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FileUpload = () => {
  const { token } = useSelector(state => state.user);

  const fileUploadAndResize = (e) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i], // file
          720, // maxWidth
          720, // maxHeigh
          'JPEG', // compressFormat
          100, // quality
          0, // rotation
          (uri) => { // responseUriFunc
          	console.log(uri);
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