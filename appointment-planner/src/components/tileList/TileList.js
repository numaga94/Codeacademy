import React from 'react';
import { Tile } from '../tile/Tile';

export const TileList = (props) => {
  const objects = props[Object.keys(props)];
  return (
    <div>
      {objects.map((value, index) => {
        return <Tile key={index} object={value} />;
      })}
    </div>
  );
};
