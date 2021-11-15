import React, { Component, useState } from "react";
import "./uploadImage.css"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const options = [
  'Grayscale', 'Blur', 'Sepia'
];
const defaultOption = options[0];

const UploadImages = () => {
  const [previewImage, setPreviewImage] = useState()


  const selectFile = (event) => {
    setPreviewImage( URL.createObjectURL(event.target.files[0]))
  }

  const deletePhoto = () => {
    setPreviewImage()
  }

  return (
    <div>
        <div>
          <div className="main-upload">
            <label className="upload-btn">
              <input id="actual-btn" type="file" accept="image/*" onChange={selectFile} hidden/>
              <label className="upload-button" htmlFor="actual-btn">Upload Image</label>
            </label>
            { previewImage && <Dropdown className="dropdown" options={options} value={defaultOption} placeholder="Select an option" />}
            { previewImage && <p className="delete-button" onClick={deletePhoto} >Delete photo</p>}
          </div>
        </div>

        {previewImage && (
          <div className="main-image">
            <img src={previewImage} alt="" />
          </div>
        )}
      </div>
  )
}

export default UploadImages
