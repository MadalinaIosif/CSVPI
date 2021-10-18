import React, { Component } from "react";

export default class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);

    this.state = {
      previewImage: undefined,
    };
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
          <div>
            <label>
              <input type="file" accept="image/*" onChange={this.selectFile} />
            </label>
          </div>
        </div>

        {previewImage && (
          <div>
            <img src={previewImage} alt="" />
          </div>
        )}
      </div>
    );
  }
}
