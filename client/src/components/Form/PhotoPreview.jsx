import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CloseButton } from '../Buttons';

export default function PhotoPreview({
  preview,
  previews,
  resetFileInput,
  selectedFile,
  handleInputChange,
}) {
  const handleClickDeleteFile = () => {
    const previewsCopy = previews.slice();
    for (let i = 0; i < previews.length; i++) {
      if (previews[i].public_id === preview.public_id) {
        previewsCopy.splice(i, 1);
      }
    }
    const e = {
      target: {
        name: 'photos',
        value: previewsCopy,
      },
    };
    handleInputChange(e);
    // selectedFile.name includes file type extension and photo.original_filename does not
    if (selectedFile.name === (`${preview.original_filename}.${preview.original_extension}` || `${preview.original_filename}.${preview.format}`)) {
      resetFileInput();
    }
    // TO-DO: use cloudinary delete method if using delete token fails
  };

  return (
    <ImageContainer>
      <ImagePreview
        src={preview?.url}
        alt={preview?.original_filename}
      />
      <DeleteButton
        $round
        onClick={handleClickDeleteFile}
      >
        &#10005;
      </DeleteButton>
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  width: 20%;
  height: 100%;
  position: relative;
  font-size: 0.5em;
  padding-right: 1.5em;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
`;

const DeleteButton = styled(CloseButton)`
  font-size: 1.5em;
  top: -0.75em;
  right: 0;
  background-color: black;
  color: white;
`;
