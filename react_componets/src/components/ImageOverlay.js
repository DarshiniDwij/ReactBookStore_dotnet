// src/components/ImageOverlay.js

import React from 'react';
import './ImageOverlay.css'; // Import CSS file for styling

const ImageOverlay = () => {
    return (
        <div className="image-overlay-container">
            <div className="image-container">
            <div className="overlay-text" style={{textAlign:'left',marginTop:'30px'}}>
                   <span style={{fontSize:'120px',lineHeight:1}}>A Sofa,</span><br/>
                   <span style={{fontSize:'120px',lineHeight:1}}> A Good </span><br/>
                   <span style={{fontSize:'120px',lineHeight:1}}> Book,</span><br/>
                   <span style={{fontSize:'120px',lineHeight:1}}> And You.</span> 
                </div>
                <img
                    src="/images/home.png"
                    alt="Background"
                    className="background-img"
                />
               
            </div>
        </div>
    );
};

export default ImageOverlay;
