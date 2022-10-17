import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Button from '../../reusable/Button.jsx';

function AddToCart() {
  const { productID, selectedStyle, productInfo, styles } = useGlobalContext();
  const [selectedSize, setSelectedSize] = useState('Select Size');
  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [inStock, setInStock] = useState(false);

useEffect(() => {
  console.log(selectedStyle);
  setSelectedSize('Select Size');
  setIsSizeSelected(false);
  // setInStock(false);
  }, [selectedStyle])

  function handleChangeSize(e) {
    e.preventDefault();
    setSelectedSize(selectedStyle.skus[e.target.value].size);
    setIsSizeSelected(true);
    setAvailableQuantity(selectedStyle.skus[e.target.value].quantity);
  }

  function handleChangeQuantity(e) {
    e.preventDefault();
    setSelectedQuantity(e.target.value);
  }

  return (
    <Cart>
      <SQContainer>
        <SelectSizeContainer>
            <SelectSize as="select" value={selectedSize} onChange={(e) => handleChangeSize(e)}>
                {/* <option>{selectedSize}</option> */}
              {selectedStyle.skus
              && (
                Object.entries(selectedStyle.skus).map(([sku, {size, quantity}], i) => {
                  // if (i === 0 && inStock === true) {
                  //   setInStock(false);
                  // }
                  if (quantity > 0 && inStock === false) {
                    setInStock(true);
                    return <option key={sku} quantity={quantity} value={sku}>{size}</option>;
                  } else if (quantity > 0 && inStock === true) {
                    return <option key={sku} quantity={quantity} value={sku}>{size}</option>;
                  } else {
                    return;
                  }
                })
              )}
            </SelectSize>
            {!inStock
            &&  <SoldOut disabled value="Out of Stock">
                  <option>Out of Stock</option>
                </SoldOut>
            }
        </SelectSizeContainer>
        <SelectQuantityContainer>
          {isSizeSelected
          ? <SelectQuantity as="select" value={selectedQuantity} onChange={(e) => handleChangeQuantity(e)}>
              {/* <Option>{selectedQuantity}</Option> */}
              {availableQuantity >= 15
              ? [...Array(16).keys()].slice(1).map((num) =>
                  <Option value={num}>{num}</Option>)
              : [...Array(availableQuantity).keys()].slice(1).map((num) =>
                  <Option value={num + 1}>{num + 1}</Option>)
              }
            </SelectQuantity>
          : <SelectQuantity disabled={!isSizeSelected} value={selectedQuantity} onChange={(e) => handleChangeQuantity(e)}>
              <Option>––</Option>
            </SelectQuantity>
          }
        </SelectQuantityContainer>
      </SQContainer>
      <BagContainer>
          {isSizeSelected
          ?
          <CartB type="submit" style={{ cursor: "pointer" }}>
            <AddCart>Add to Cart</AddCart>
            <PlusSign>+</PlusSign>
          </CartB>
          :
          <CartB type="submit" disabled>
            <AddCart>Add to Cart</AddCart>
            <PlusSign>+</PlusSign>
          </CartB>}
          <Star type="button">&#9734;</Star>
      </BagContainer>
    </Cart>
  );
}


const Cart = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 4/6;
  grid-row: 1;
  margin-right: 1em;
  width: 100%;
`;
//font-size: 1.25rem;
const SQContainer = styled.div`
  flex-direction: row;
  align-content: space-between;
  display: flex;
  margin-bottom: 2.5%;
  margin-right: 10%;
  justify-content: space-between;
  flex-basis: 2.5em;
  flex-grow: 1;
  flex-shrink: 1;
`;

const SelectSizeContainer = styled.div`
  flex-basis: 9.8em;
  flex-grow: 3;
  flex-shrink: 1;
  margin-right: 1em;
  height: 100%;
`;

//height: 2.5rem;

const SelectSize = styled(Button)`
  width: 100%;
  height: 100%;
`;
// padding-bottom: 0.5em;
// padding-top: 0.5em;
// padding-left: 1em;
// padding-right: 1em;
//font-size: 1.0rem;

const SoldOut = styled(Button)`
  width: 100%;
`;
// font-size: calc(8px + 0.5vw);
//padding: calc(4px + 0.25vw) calc(8px + 0.5vw);
//font-size: 1.0rem;
// padding-bottom: 0.5em;
// padding-top: 0.5em;
// padding-left: 1em;
// padding-right: rem;
const SelectQuantityContainer = styled.div`
  height: 100%;
  flex-basis: 6em;
  flex-grow: 1;
  flex-shrink: 3;
  width: 100%;
`;

//height: 2.5rem;

const SelectQuantity = styled(Button)`
  width: 100%;
`;
//font-size: calc(8px + 0.5vw);
//padding: calc(4px + 0.25vw) calc(8px + 0.5vw);
//font-size: 1.0rem;
// padding-bottom: 0.5em;
// padding-top: 0.5em;
// padding-left: 1em;
// padding-right: rem;
//can combine flex-basis, grow, and shrink into one line shorthand

const Option = styled.option`
  min-height: 0;
  padding: 0;
`;

const BagContainer = styled.div`
  display: flex;
  margin-right: 10%;
  justify-content: space-between;
  margin-top: 2.5%;
  flex-basis: 2.5em;
  flex-grow: 1;
  flex-shrink: 1;
`;


const CartB = styled(Button)`
  padding: calc(5px + 0.5vw);
  height: 100%;
  position: relative;
  margin-right: calc(10px + 1vw);
  flex-basis: 13.3em;
  flex-grow: 5;
  flex-shrink: 1;
`;
//font-size: 1.0rem;
//height: 2.5rem;

// padding: 0 1rem;

const AddCart = styled.span`
  position: absolute;
  top: 25%;
  left: 7.5%;
`;
//left: 1rem;
//top: 0.5rem;

const PlusSign = styled.span`
  position: absolute;
  top: 25%;
  right:7.5%;
`;

// top: 0.5rem;
//   right: 1rem;
const Star = styled(Button)`
  height: 100%;
  right: 5%;
  flex-basis: 2.5em;
  flex-grow: 1;
  flex-shrink: 5;
`;
//font-size: 0.5;
//font-size: 1.25rem;
//height: 2.5rem;

export default AddToCart;
