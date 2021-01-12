import React from 'react';
import './Business.css';

export default function Business(props) {
  const location = () => {
    if (props.business.country === 'FR') {
      return (
        <div className="Business-address">
          <p>{props.business.address}</p>
          <p>
            {props.business.zipCode} {props.business.city}
          </p>
          <p>{props.business.distance} km</p>
        </div>
      );
    } else {
      return (
        <div className="Business-address">
          <p>{props.business.address}</p>
          <p>
            {props.business.city}, {props.business.state}, {props.business.zipCode}
          </p>
          <p>{props.business.distance} km</p>
        </div>
      );
    }
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="Business">
      <div className="image-container">
        <img src={props.business.imageSrc} alt={props.business.name} />
      </div>
      <h2>{props.business.name}</h2>
      <div className="Business-information">
        {location()}
        <div className="Business-reviews">
          <h3>{props.business.category}</h3>
          <h3 className="rating">{props.business.rating} stars</h3>
          <p>{props.business.reviewCount} reviews</p>
        </div>
      </div>
    </div>
  );
}
