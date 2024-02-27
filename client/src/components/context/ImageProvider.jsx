import React, { useState } from 'react';
import { ImageContext } from './ImageContext';
import defaultUserImg from "../assets/DefaultUserPicture.jpg";
import defaultAdminImg from "../assets/DefaultAdminPicture.jpg";

export const ImageProvider = ({ children }) => {
  const userId = localStorage.getItem('user'); 
  const [imageURL, setImageURL] = useState(localStorage.getItem(`defaultAdminImg_${userId}`) || defaultAdminImg);
  const [imageURLClient, setImageURLClient] = useState(localStorage.getItem(`defaultUserImg_${userId}`) || defaultUserImg);
 
  const updateImageURLAdmin = (newURL) => {
    setImageURL(newURL);
    localStorage.setItem(`defaultAdminImg_${userId}`, newURL);
  };
  const updateImageURLClient = (newURLClient) => {
    setImageURLClient(newURLClient);
    localStorage.setItem(`defaultUserImg_${userId}`, newURLClient);
  };

  return (
        <ImageContext.Provider value={{ imageURL, imageURLClient, updateImageURLAdmin, updateImageURLClient }}>
      {children}
    </ImageContext.Provider>
  );
};
