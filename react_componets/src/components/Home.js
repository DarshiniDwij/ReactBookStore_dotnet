import React, { useState, useEffect } from "react";
import ImageOverlay from "./ImageOverlay";
import DivOverlay from "./DivOverlay";
import BookLaunch from "./BookLaunch";

const Home = () => {
  return (
    <div>
      <main>
        <ImageOverlay></ImageOverlay>
        <DivOverlay></DivOverlay>
        <section id="bookLaunch">
          <BookLaunch></BookLaunch>
        </section>
      </main>
    </div>
  );
};

export default Home;
