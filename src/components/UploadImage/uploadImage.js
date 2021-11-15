import React, { Component, useState } from "react";
import "./uploadImage.css"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const options = [
  'onasdasdsdasdasdas a asd asdasdasde', 'two', 'three'
];
const defaultOption = options[0];

const UploadImages = () => {
  const [previewImage, setPreviewImage] = useState();


  const selectFile = (event) => {
    setPreviewImage( URL.createObjectURL(event.target.files[0]));
  }
  return (
    <div>
        <div>
          <div className="main-upload">
            <label className="upload-btn">
              <input id="actual-btn" type="file" accept="image/*" onChange={selectFile} hidden/>
              <label className="upload-button" htmlFor="actual-btn">Upload Image</label>
            </label>
            <Dropdown className="dropdown" options={options} onChange={this.onSelect} value={defaultOption} placeholder="Select an option" />

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

export default UploadImages;
