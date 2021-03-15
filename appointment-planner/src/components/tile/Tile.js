import React from 'react';

export const Tile = (props) => {
  const object = props.object;
  const keys = Object.keys(object);
  // console.log(props.key);
  // console.log(keys);
  // console.log(object);
  return (
    <div className="tile-container">
      <p key={0} className="tile-title">
        {object[keys[0]]}
      </p>
      {keys.slice(1).map((value, index) => {
        return (
          <p key={index + 1} className="tile">
            {object[value]}
          </p>
        );
      })}
    </div>
  );
};
