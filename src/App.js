import React, { useState, useEffect } from "react";
import "./App.css";

function InstaContactDiv(){
  return <div className="contact-item right">
          {/* Make Instagram icon and text clickable */}
          <a href="https://www.instagram.com/Horizon_byvishakha" target="_blank"  className="contact-link">
            <img src="/images/instagram-logo.png" alt="Instagram" className="contact-logo" />
            <span>@Horizon_byvishakha</span>
          </a>
        </div>;
}

// function whatsappContactDiv({ smallScreen }) {
function WhatsappContactDiv() {
  return <div className="contact-item">
          {/* Make phone icon and text clickable */}
          <a href="https://wa.me/918087741509" className="contact-link">
            <img src="/images/whatsapp-logo.png" alt="WhatsApp" className="contact-logo" />
            <span>
              {/* Conditionally render text based on screen size */}
              {/* {smallScreen ? "8087741509" : "Horizon (+91) 80877 41509"} */}
              Horizon (+91) 80877 41509
            </span>
          </a>
        </div>;
}

function PaddingDiv(){
  return <div className="contact-item pad">
          {/* Make Instagram icon and text clickable */}
          <h2></h2>
          {/* <a href="https://www.instagram.com/Horizon_byvishakha" target="_blank"  className="contact-link">
            <img src="/images/instagram-logo.png" alt="Instagram" className="contact-logo" />
            <span>@Horizon_byvishakha</span>
          </a> */}
        </div>;
}


function ContactsDiv({ isMobile }) {

  if(!isMobile){
    return (
          <div className="contact-section">
            <InstaContactDiv />
            <WhatsappContactDiv />
          </div>
    );
  }
  // else
  return (
      <>
          <div className="contact-section INSTA">
            <InstaContactDiv />
          </div>
          <div className="contact-section WA">
            <WhatsappContactDiv />
          </div>
          <div className="contact-section WA">
            <PaddingDiv />
          </div>
      </>
  );
}

function App() {
  // Static array of image paths relative to the public directory
  const imageList = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    // Add more image paths as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Handle swipe direction
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left - show next image
      nextImage();
    }

    if (touchStartX - touchEndX < -50) {
      // Swipe right - show previous image
      prevImage();
    }
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentImagePath = imageList[currentIndex];

  // Track screen width
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle resize event to update screen type
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App">
      <div className="image-section">
        <div className="image-gallery"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}>
          <>
            <button className="nav-button left" onClick={prevImage}>
              &lt;
            </button>
            <img
              src={currentImagePath}
              alt={`Image ${currentIndex + 1}`}
              className="gallery-image"
            />
            <button className="nav-button right" onClick={nextImage}>
              &gt;
            </button>
          </>
        </div>
      </div>

      <ContactsDiv isMobile={isMobile} />
      
    </div>  //App Div
  );
}

export default App;
