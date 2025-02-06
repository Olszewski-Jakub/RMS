import React, { useState, useEffect } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ImageSlider = ({ imageUrls }) => {
    const [imageIndex, setImageIndex] = useState(0);

    const nextImage = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };

    const prevImage = () => {
        setImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
    };

    
    return (
        <div className="image-slider" style={{ position: "relative", width: "100%", height: "400px" }}>
            <img
                src={imageUrls[imageIndex]}
                alt={`Slide ${imageIndex}`}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", 
                    borderRadius: "10px"
                }}
            />
            <button
                onClick={prevImage}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    fontSize: "2rem",
                    color: "#FF7D05",
                    cursor: "pointer"
                }}
            >
                <FaArrowCircleLeft />
            </button>
            <button
                onClick={nextImage}
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    fontSize: "2rem",
                    color: "#FF7D05",
                    cursor: "pointer"
                }}
            >
                <FaArrowCircleRight />
            </button>
        </div>
    );
};

ImageSlider.propTypes = {
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageSlider;