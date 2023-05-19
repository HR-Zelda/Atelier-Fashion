import React, {
  useState, useRef, useEffect, useLayoutEffect,
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import {
  MdArrowForwardIos, MdArrowBackIos,
} from 'react-icons/md';
import Thumbnails from './Thumbnails';

import { useGlobalContext } from '../../../contexts/GlobalStore';

function ImageGallery({
  status, setStatus, place = 0, setPlace,
}) {
  const { productInfo, selectedStyle } = useGlobalContext();

  const imageContainer = useRef(null);

  const carousel = useRef(null);

  const carouselViewport = useRef(null);

  const [imageHeight, setImageHeight] = useState(0);

  useLayoutEffect(() => {
    if (carouselViewport.current) {
      const { height } = carouselViewport.current.getBoundingClientRect();
      setImageHeight(height);
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      if (carouselViewport.current) {
        console.log('carouselViewport.current: ', carouselViewport.current);
        const { height } = carouselViewport.current.getBoundingClientRect();
        setImageHeight(height);
        console.log('height: ', height);
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [firstPhotoIndex, setFirstPhotoIndex] = useState(0);

  function handleClickArrow(n) {
    if (place === firstPhotoIndex && n === -1) {
      setFirstPhotoIndex((prev) => prev - 1);
    }
    if ((place === firstPhotoIndex + 5) && n === 1) {
      setFirstPhotoIndex((prev) => prev + 1);
    }
    setPlace((prev) => prev + n);
  }

  const [xPerc, setXPerc] = useState('');
  const [yPerc, setYPerc] = useState('');

  function getProportionalZoom(e) {
    if (imageContainer.current) {
      const containerWidth = imageContainer.current.clientWidth;
      const containerHeight = imageContainer.current.clientHeight;
      const x = e.pageX - imageContainer.current.offsetLeft;
      const y = e.pageY - imageContainer.current.offsetTop;
      const xPercent = `${(x / (containerWidth / 100)) * 1.25}%`;
      const yPercent = `${(y / (containerHeight / 100)) * 1.25}%`;
      setXPerc(() => xPercent);
      setYPerc(() => yPercent);
    }
  }

  function handleClickMain(e) {
    e.preventDefault();
    switch (status) {
      case 'default':
        setStatus(() => 'expanded');
        break;
      case 'expanded':
        setStatus(() => 'zoomed');
        getProportionalZoom(e);
        break;
      case 'zoomed':
        setStatus(() => 'expanded');
        break;
      default:
        console.log('error handling expand main');
    }
  }

  function handlePanImage(e) {
    if (status !== 'default') {
      getProportionalZoom(e);
    }
  }

  function handleClickExit(e) {
    e.preventDefault();
    setStatus(() => 'default');
  }

  function scrollHandler(e) {
    e.preventDefault();

    const carouselDimensions = carouselViewport.current
      && carouselViewport.current.getBoundingClientRect();
    const carouselOffsets = carousel.current && carousel.current.getBoundingClientRect();

    const leftPadding = carouselDimensions && carouselDimensions.x;
    const carouselItemWidth = carouselDimensions && carouselDimensions.width;

    const leftOffset = carouselOffsets && carouselOffsets.x;

    // console.log('leftOffset: ', leftOffset, 'leftPadding: ', leftPadding, 'carouselItemWidth: ', carouselItemWidth);

    // console.log('result: ', (leftOffset - leftPadding) / Math.floor(carouselItemWidth));

    const currentItemIndex = Math.floor(Math.abs((leftOffset - leftPadding) / Math.floor(carouselItemWidth))) || 0;

    // console.log('result: ', (leftOffset - leftPadding) / Math.floor(carouselItemWidth));

    setPlace(currentItemIndex);

    // console.log('currentItemIndex: ', currentItemIndex);
  }

  // useEffect(() => {
  //   window.addEventListener('scroll', scrollHandler);
  //   return () => {
  //     window.removeEventListener('scroll', scrollHandler);
  //   };
  // }, [carousel, carouselViewport]);

  return (
    <ImageGalleryContainer
      status={status}
      place={place}
      setPlace={setPlace}
    >

      {/* {status === 'default'
        && (
        <Side
          full={() => thumbnails.length > 7}
          middle={place !== 0 && place !== thumbnails.length - 1}
          status={status}
        > */}
      {/* {thumbnails.length <= 7
            ? thumbnails
            : (
              <>
                <Buttons
                  scroll
                  onClick={() => handleScroll(-1)}
                  style={{ display: firstPhotoIndex === 0 ? 'none' : '' }}
                >
                  <MdExpandLess style={{ fontSize: '1.25em' }} />
                </Buttons>
                {thumbnails.slice(firstPhotoIndex, firstPhotoIndex + 7)}
                <Buttons
                  scroll
                  onClick={() => handleScroll(1)}
                  style={{ display: firstPhotoIndex < thumbnails.length - 7 ? '' : 'none' }}
                >
                  <MdExpandMore style={{ fontSize: '1.25em' }} />
                </Buttons>
              </>
            )}
        </Side>
        )} */}

      {selectedStyle.photos
      && (
        <>
          {status !== 'zoomed'
           && (
           <AnimationContainer photosLength={selectedStyle.photos.length} place={place}>

             <MainWrapper
               id="carousel-container"
               status={status}
               place={place}
               photosLength={selectedStyle.photos.length}
               onScroll={(e) => scrollHandler(e)}
               ref={carouselViewport}
             >

               <Carousel id="carousel" photosLength={selectedStyle.photos.length} place={place} status={status} ref={carousel}>
                 {selectedStyle.photos.map((photo, index) => (
                   <Slide
                     key={photo.url}
                     i={index}
                     id={`seq${index}`}
                     onClick={(e) => handleClickMain(e)}
                     status={status}
                     place={place}
                     setPlace={setPlace}
                   >
                     <Main
                  //  id={photo.url}
                  //  src={selectedStyle.photos[place || 0].url}
                       onClick={(e) => handleClickMain(e)}
                       src={selectedStyle.photos[index].url}
                       alt={`${productInfo.name} in ${selectedStyle.name} style photo number ${index}`}
                       status={status}
                       setStatus={setStatus}
                       place={place}
                       i={index}
                     />
                   </Slide>
                 ))}

               </Carousel>

             </MainWrapper>

             <Buttons
               place={place}
               setPlace={setPlace}
               left
               firstPhotoIndex={firstPhotoIndex}
               setFirstPhotoIndex={setFirstPhotoIndex}
               onClick={() => handleClickArrow(-1)}
             >
               <MdArrowBackIos status={status} style={{ fontSize: status === 'expanded' ? '2.0rem' : '2.5rem', paddingLeft: '0.25rem', paddingTop: '0.25rem' }} />
             </Buttons>
             <Buttons
               onClick={() => handleClickArrow(1)}
               place={place}
               setPlace={setPlace}
               photosLength={selectedStyle.photos.length}
               right
               firstPhotoIndex={firstPhotoIndex}
               setFirstPhotoIndex={setFirstPhotoIndex}
             >
               <MdArrowForwardIos status={status} style={{ fontSize: status === 'expanded' ? '2.0rem' : '2.5rem', paddingTop: '0.25rem', paddingRight: '0.25rem' }} />
             </Buttons>

             {status === 'expanded'
          && (
          <Exit
            onClick={(e) => handleClickExit(e)}
          >
            &times;
          </Exit>
          )}
           </AnimationContainer>
           )}

          {status === 'zoomed'
          && (
          // <AnimationContainer>
          <MainWrapper ref={imageContainer} status={status}>
            <Main
              src={selectedStyle.photos[place || 0].url}
              onClick={(e) => handleClickMain(e)}
              alt={`${productInfo.name} in ${selectedStyle.name} style photo number ${place}`}
              status={status}
              setStatus={setStatus}
              place={place}
              onMouseMove={(e) => handlePanImage(e)}
              xPercent={xPerc}
              yPercent={yPerc}
            />

          </MainWrapper>
          //  </AnimationContainer>

          )}

        </>
      )}

        <Thumbnails place={place} setPlace={setPlace} status={status} firstPhotoIndex={firstPhotoIndex} setFirstPhotoIndex={setFirstPhotoIndex}/>

    </ImageGalleryContainer>
  );
}

ImageGallery.propTypes = {
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
  place: PropTypes.number.isRequired,
  setPlace: PropTypes.func.isRequired,
};

const ImageGalleryContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 1.5em;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex: 1 2 400px;
  };

  ${(props) => props.status === 'default' && css`
    max-height: 820px;

    @media (min-width: 600px) {
      column-gap: 1em;
      position: sticky;
      top: 60px;
      padding-bottom: 0px;
    };

    @media (min-width: 800px) {
      flex: 1 3 500px;
      aspect-ratio: 5/6;
      flex-direction: row;
      column-gap: 0;
    };
  `};

  ${(props) => props.status === 'expanded' && css`
    margin: auto;
    height: max-content;
    justify-content: center;
    align-items: center;
    align-content: center;
  `};

  ${(props) => props.status === 'zoomed' && css`
    margin: auto;
    height: max-content;
    justify-content: center;
    align-items: center;
    align-content: center;
  `};
 };
`;
// overflow: hidden;

const AnimationContainer = styled.div`
  position: relative;
  height: fit-content;
  flex: 6 1 0;
`;

const MainWrapper = styled.div`

  margin: 0 auto;

  padding: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  overflow: hidden;
  position: relative;
  aspect-ratio: 4/6;
  z-index: 1;
  overflow-x: scroll;
  --slide-count: ${(props) => props.photosLength};
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  };
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${(props) => props.status === 'default' && css`
  @media (min-width: 800px) {
    flex: 6 1 450px;
    height: initial;
    overflow-x: hidden;
  };
  `};

  @media (min-width: 600px) {
    height: fit-content;

    ${(props) => props.status === 'default' && css`
      width: 100%;
      @media (min-width: 600px) {
        max-height: 840px;
      };
      @media (min-height: 1200px) {
        max-width: 800px;
        max-height: 1200px;
      }
    `};
  };

  @media (min-width: 600px) {
    ${(props) => props.status === 'expanded' && css`
      max-height: 120vh;
    `};

    ${(props) => props.status === 'zoomed' && css`
      max-height: 120vh;
      max-width: 80vh;
    `};
  };
`;

// might need to put the declaration block for !zoomed inside the media query
const Carousel = styled.ul`
  display: flex;
  left: 0;
  position: relative;

  @media (min-width: 800px) {
    transition: translate 0.5s;
    translate: ${(props) => `calc((-100% / ${props.photosLength}) * ${props.place})`} 0;
  };

  ${(props) => props.status !== 'zoomed' && css`
    margin: 0;
    padding: 0;
    width: ${props.photosLength}00%;
  `};
`;

const Slide = styled.li`
  scroll-snap-align: start;
  width: 100%;
  height: 100%;
`;

const Main = styled.img`
  object-fit: cover;
  overflow: hidden;
  aspect-ratio: 4/6;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  z-index: 2;

  ${(props) => props.status === 'default' && css`
    max-width: 600px;
    transition: translate 0.25s smooth transform 0.25s ease;
    position: relative;
    cursor: zoom-in;
    @media (min-width: 600px) {
      max-height: 840px;
    };
    @media (min-height: 1200px) {
      max-width: 800px;
      max-height: 1200px;
    }
  `};

  ${(props) => props.status === 'expanded' && css`
    cursor: crosshair
  `};

  ${(props) => props.status === 'zoomed' && css`
    transform: scale(2.5);
    transition: transform 0.25s ease;
    transform-origin: top left;
    transition: translate 0.25s smooth;
    position: absolute;
    translate: ${(props) => `-${props.xPercent}`} ${(props) => `-${props.yPercent}`};
    cursor: zoom-out;
  `};
`;

// journal: needed to have display: grid (along with position: relative) to display image underneath thumbnail images with larger z-indexes, even though no grid-template columns or rows were set on the background image with display: grid;

// MVP journal: cannot select by fields in a mongodb document that is simply referenced by objectID in another schema.  you have to run the populate method to get the fields of the nested schema to populate in the outer model, and cannot then find by a certain field or value. instead, have to denormalize the data when you design your schemas.

// fill is a css property you can use to color in icons

// to make font-size responsive, set the root font-size to be a porportion of the view width, i.e. html {
// font-size: () => 15px + 0.3vw;  // not 100% on my syntax but that's the jist
// },
// buttons, inputs, selects and some other elements have default broswer font-size, padding, and other settings that are not overridden by a general font-size change and using rem or em

// file input elements should work for mobile, and suggest file, access camera, access photos

// advice to incoming HR students:
// pay special attentiom to data structures and algorithims
// time management is key
// what stack overflow is
// theres youtube videos with instructions/lessons
// almost everything you are going to do has been done before
// be careful not to spin your wheels too much/too long
// get a solid note taking strategy /organization strategy down before class starts (recs; notation)
// second monitor

const Side = styled.div`
  display: none;

  @media (min-width: 700px) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    place-self: center;
    position: initial;
    max-width: 100%;
    height: 100%;
    padding-top: calc(1px + 0.1em);

    display: flex;
    flex-direction: column;
    row-gap: 1.0rem;
    align-items: flex-end;
    justify-content: flex-start;
    align-content: center;
    z-index: 3;
  };
`;

const Buttons = styled.button`
  display: none;
  @media (min-width: 800px) {
    ${(props) => props.left && css`
      left: 0%;
      display: ${props.place > 0 ? 'block' : 'none'};
    `};
    ${(props) => props.right && css`
    right: 0%;
    display: ${props.place < props.photosLength - 1 ? 'block' : 'none'};
  `};
  };
  background-color: white;
  &:hover {
    background-color: rgba(225, 225, 225, 0.9);
  };
  padding: 0;
  color: black;
  border: none;
  width: 3rem;
  height: 3rem;
  z-index: 3;
  align-self: center;
  position: absolute;
  top: 44%;
  ${(props) => props.scroll && css`
    top: initial;
    height: 2rem;
    width: 3rem;
    align-self: center;
    top: 0;
    z-index: 4;
    position: relative;
    background-color: initial;
    &:hover {
      background-color: rgba(225, 225, 225, 0.75);
    };
    font-size: 2rem;
  `};
  ${(props) => (props.status === 'expanded' && css`
    left: 2%;
    line-height: 1.5em;
    width: 1.5em;
    height: 1.5em;
    font-size: 2.5rem;
  `)};
`;
// background-color: rgba(225, 225, 225, 0.75);
// position: absolute (not scroll);

const Exit = styled.button`
  position: absolute;
  right: 1%;
  top: 1%;
  z-index: 3;
  background-color: white;
  &:hover {
    background-color: rgba(225, 225, 225, 0.9);
  };
  font-size: 2.5rem;
  display: block;
  color: black;
  border: none;
  width:1.5em;
  height: 1.5em;
  line-height: 1.5em;
`;

const ThumbnailsViewport = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
  display: none;
  @media (min-width: 800px) {
    display: ${(props) => (props.status === 'default' ? 'block' : 'none')};
  }
`;

export default ImageGallery;

// left arrow &#8592;
// up arrow &#8593;
// right arrow &#8594;
// down arrow &#8595;

// x in a rectangular box &#8999;

// up arrowhead / collapse arrow &#8963;

// horizontal line &#9472;
// plus 	&#43;
// fullwidth hyphen minus 	&#65293;
