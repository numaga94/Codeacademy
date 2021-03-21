import React, { useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCards } from './cardsSlice';

export default function Card({ id }) {
  const cards = useSelector(selectCards); // replace this with a call to your selector to get all the cards in state
  const card = cards[id];
  const [flipped, setFlipped] = useState(false);
  // console.log(cards);

  return (
    <li>
      <button className={flipped ? 'cardFront' : 'cardBack'} onClick={(e) => setFlipped(!flipped)}>
        {flipped ? card.back : card.front}
      </button>
    </li>
  );
}
