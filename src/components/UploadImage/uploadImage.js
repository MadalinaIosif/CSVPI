import React, { Component, useState } from "react";
import "./uploadImage.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const options = ["Grayscale", "Blur", "Sepia", "Sobel"];

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

  //-------------------------SOBEL---------------------------//
  const dograyscale = function(pixels, args) {
    console.log(pixels);
    var d = pixels.data;
    for (var i=0; i<d.length; i+=4) {
      var r = d[i];
      var g = d[i+1];
      var b = d[i+2];
      // CIE luminance for the RGB
      // The human eye is bad at seeing red and blue, so we de-emphasize them.
      var v = 0.2126*r + 0.7152*g + 0.0722*b;
      d[i] = d[i+1] = d[i+2] = v
    }
    return pixels;
  };

  const createImage = function(w,h,ctx) {
    console.log(w)
    console.log(h)
    console.log(ctx)
    return ctx.createImageData(w,h);
  };

  const convolute = function(pixels, weights, opaque, ctx) {
    console.log(ctx)
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side/2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    // pad output by the convolution matrix
    var w = sw;
    var h = sh;
    var output = createImage(w, h, ctx);
    var dst = output.data;
    // go through the destination image pixels
    var alphaFac = opaque ? 1 : 0;
    for (var y=0; y<h; y++) {
      for (var x=0; x<w; x++) {
        var sy = y;
        var sx = x;
        var dstOff = (y*w+x)*4;
        // calculate the weighed sum of the source image pixels that
        // fall under the convolution matrix
        var r=0, g=0, b=0, a=0;
        for (var cy=0; cy<side; cy++) {
          for (var cx=0; cx<side; cx++) {
            var scy = sy + cy - halfSide;
            var scx = sx + cx - halfSide;
            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              var srcOff = (scy*sw+scx)*4;
              var wt = weights[cy*side+cx];
              r += src[srcOff] * wt;
              g += src[srcOff+1] * wt;
              b += src[srcOff+2] * wt;
              a += src[srcOff+3] * wt;
            }
          }
        }
        dst[dstOff] = r;
        dst[dstOff+1] = g;
        dst[dstOff+2] = b;
        dst[dstOff+3] = a + alphaFac*(255-a);
      }
    }
    return output;
  };
  const sobel=(image, ctx)=>{
    var grayscale = dograyscale(image, null);
    // Note that ImageData values are clamped between 0 and 255, so we need
    // to use a Float32Array for the gradient values because they
    // range between -255 and 255.
    var vertical = convolute(grayscale,
      [ -1, 0, 1,
        -2, 0, 2,
        -1, 0, 1 ],true, ctx);
    var horizontal = convolute(grayscale,
      [ -1, -2, -1,
         0,  0,  0,
         1,  2,  1 ],true, ctx);
    var final_image = createImage(vertical.width, vertical.height, ctx);
    for (var i=0; i<final_image.data.length; i+=4) {
      // make the vertical gradient red
      var v = Math.abs(vertical.data[i]);
      final_image.data[i] = v;
      // make the horizontal gradient green
      var h = Math.abs(horizontal.data[i]);
      final_image.data[i+1] = h;
      // and mix in some blue for aesthetics
      final_image.data[i+2] = (v+h)/4;
      final_image.data[i+3] = 255; // opaque alpha

    }
    return final_image;
    }

    const doSobel = (elementCanvas) => {
      if (elementCanvas.getContext) {
        let ctx = elementCanvas.getContext("2d");
        let dataCanvas = ctx.getImageData(
          0,
          0,
          elementCanvas.width,
          elementCanvas.height
        );
        let imageData = dataCanvas.data;
        var image = sobel(dataCanvas, ctx);
        ctx.putImageData(image, 0, 0);
      }
    };  

  //-------------------------END-SOBEL---------------------------//


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

  const handleChange=(e)=>{
    const functions={"sobel": doSobel}
    var canvas=document.getElementById("canvas");
    var option = e.value.toLowerCase();
    var func=functions[option];
    if (func!= undefined){
      func(canvas);
    }
  }

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
              onChange={handleChange}
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
