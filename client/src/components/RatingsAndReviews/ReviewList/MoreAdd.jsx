import React, { useRef } from 'react';
import styled from 'styled-components';

function MoreAdd({ reviews, getReviews, noMoreReviews, setRevCount }) {
  const handleMoreReviews = function handleMoreReviews() {
    setRevCount((prevRevCount) => prevRevCount + 2);
  };

  return (
    <div>
      {
        !noMoreReviews.current
        && (
          <button type="button" onClick={handleMoreReviews}>
            MORE REVIEWS
          </button>
        )
      }
      <button type="button">
        ADD A REVIEW +
      </button>
    </div>
  );
}

export default MoreAdd;
