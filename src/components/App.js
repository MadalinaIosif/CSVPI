import React from "react";
import UploadImages from "./UploadImage/uploadImage";
import "./App.css"
import Header from "./Header/Header";


const App = () => {
  return (
    <div className="app">
      <div>
        <Header />
      </div>
      <div style={{display: "flex", alignItems: "center"}}>
        <UploadImages />
      </div>

    </div>
  );
};

export default App;
