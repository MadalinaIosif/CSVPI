import React, { Component } from "react";
import "./uploadImage.css"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const options = [
  'one', 'two', 'three'
];
const defaultOption = options[0];

export default class UploadImages extends Component {
  
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);

    this.state = {
      previewImage: undefined,
    };
  }

  onSelect = e => {
      console.log(e)
  }  

  selectFile(event) {
    this.setState({
      previewImage: URL.createObjectURL(event.target.files[0]),
    });
  }

  render() {
    const { previewImage } = this.state;

    return (
      <div>
        <div>
          <div className="main-upload">
            <label className="upload-btn">
              <input id="actual-btn" type="file" accept="image/*" onChange={this.selectFile} hidden/>
              <label className="upload-button" htmlFor="actual-btn">Upload Image</label>
            </label>
            <Dropdown options={options} onChange={this.onSelect} value={defaultOption} placeholder="Select an option" />

          </div>
        </div>

        {previewImage && (
          <div className="main-image">
            <img src={previewImage} alt="" />
          </div>
        )}
      </div>
    );
  }
}
