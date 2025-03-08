import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ImageSlider = ({ imageUrls }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const nextImage = useCallback(() => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
            setTimeout(() => setIsTransitioning(false), 500);
        }
    }, [imageUrls.length, isTransitioning]);

    const prevImage = useCallback(() => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
            setTimeout(() => setIsTransitioning(false), 500);
        }
    }, [imageUrls.length, isTransitioning]);

    // Auto-advance the slider
    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 5000);
        return () => clearInterval(interval);
    }, [nextImage]);

    return (
        <div className="image-slider">
            <img
                src={imageUrls[imageIndex]}
                alt={`Slide ${imageIndex}`}
                style={{
                    transform: isTransitioning ? 'scale(1.05)' : 'scale(1)',
                }}
            />
            <div className="slider-indicators">
                {imageUrls.map((_, index) => (
                    <button
                        key={index}
                        className={`slider-indicator ${index === imageIndex ? 'active' : ''}`}
                        onClick={() => {
                            if (!isTransitioning) {
                                setIsTransitioning(true);
                                setImageIndex(index);
                                setTimeout(() => setIsTransitioning(false), 500);
                            }
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                        style={{
                            width: index === imageIndex ? '20px' : '10px',
                            height: '10px',
                            borderRadius: '5px',
                            backgroundColor: index === imageIndex ? '#FF7D05' : 'rgba(255, 255, 255, 0.7)',
                            border: 'none',
                            margin: '0 5px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                        }}
                    />
                ))}
            </div>
            <button
                onClick={prevImage}
                className="slider-nav-button prev"
                aria-label="Previous slide"
            >
                <FaChevronLeft />
            </button>
            <button
                onClick={nextImage}
                className="slider-nav-button next"
                aria-label="Next slide"
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

ImageSlider.propTypes = {
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageSlider;