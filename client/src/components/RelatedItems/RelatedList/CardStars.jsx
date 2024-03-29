import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function CardStars({ reviewID }) {

  const baseStars = [];
  const filledStars = [];
  const reviews = reviewID.results;
  let average = 0;
  for (let i = 0; i < reviews.length; i += 1) {
    average += reviews[i].rating;
  }
  average /= reviews.length;
  const partial = average * 20;
  for (let i = 0; i < 5; i += 1) {
    baseStars.push(<span className="empty-star" key={i}>&#9734;</span>);
    filledStars.push(<span className="filled-star" key={i}>&#9733;</span>);
  }

  return (
    <Stars>
      <FilledStar className="star" size={partial}>{filledStars}</FilledStar>
      <BaseStar className="star">{baseStars}</BaseStar>
    </Stars>
  );
}

CardStars.propTypes = {
  reviewID: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      rating: PropTypes.number,
    })),
  }).isRequired,
};

const Stars = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.5em;
  color: ${(props) => props.theme.fontColor};
`;

const BaseStar = styled.span`
  position: relative;
`;

const FilledStar = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  width: ${(props) => props.size}%;
  overflow:hidden;
  flex-direction: row;
  color: gold;
  font-size: bold;
`;

export default CardStars;
