import React, { Component, useState } from "react";
import "./uploadImage.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const options = ["Grayscale", "Blur", "Sepia"];
const defaultOption = options[0];

const UploadImages = () => {
  const [previewImage, setPreviewImage] = useState();

  const selectFile = (event) => {
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const deletePhoto = () => {
    setPreviewImage();
  };

  const imageFunction = () => {
    let elementCanvas = document.getElementById("canvas");
    if (elementCanvas.getContext) {
      let ctx = elementCanvas.getContext("2d");

      var img1 = new Image();

      img1.onload = function () {
        elementCanvas.width = img1.width;
        elementCanvas.height = img1.height;
        ctx.drawImage(img1, 0, 0);
      };

      img1.src = previewImage;
    }
  };

  const doNegative = (elementCanvas) => {
    if (elementCanvas.getContext) {
      let ctx = elementCanvas.getContext("2d");
      let dataCanvas = ctx.getImageData(
        0,
        0,
        elementCanvas.width,
        elementCanvas.height
      );
      let imageData = dataCanvas.data;
      // Todo: Implement your logic
      for (let i = 0; i < imageData.length; i += 4) {
        imageData[i] = 255 - imageData[i]; // componenta R (primul pixel stanga sus)
        imageData[i + 1] = 255 - imageData[i + 1]; // componenta G (primul pixel stanga sus)
        imageData[i + 2] = 255 - imageData[i + 2]; // componenta B (primul pixel stanga sus)
      }
      //Finish your implementation
      ctx.putImageData(dataCanvas, 0, 0);
    }
  };

  return (
    <div>
      <div>
        <div className="main-upload">
          <label className="upload-btn">
            <input
              id="actual-btn"
              type="file"
              accept="image/*"
              onChange={selectFile}
              hidden
            />
            <label className="upload-button" htmlFor="actual-btn">
              Upload Image
            </label>
          </label>

          {previewImage && (
            <Dropdown
              className="dropdown"
              options={options}
              value={defaultOption}
              placeholder="Select an option"
            />
          )}
          {previewImage && (
            <p className="delete-button" onClick={deletePhoto}>
              Delete photo
            </p>
          )}
        </div>
      </div>

      <label
        className="upload-button"
        onClick={() => {
          doNegative(document.getElementById("canvas"));
        }}
      >
        NEGATIVE
      </label>
      {previewImage && imageFunction()}
      <div>
        <canvas id="canvas" width="1280" height="720"></canvas>
      </div>
    </div>
  );
};

export default UploadImages;
