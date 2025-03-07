import React from 'react';
const Map = () => {
    return (
        <div className="map-container">
            <div className="map">
                <iframe
                    title="Google Maps Location"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=University%20Rd,%20Galway+(RMS)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                >
                    <a href="https://www.gps.ie/">gps devices</a>
                </iframe>
            </div>
        </div>
    );
};

export default Map;