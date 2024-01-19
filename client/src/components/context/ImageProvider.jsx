import React, { useState } from 'react';
import { ImageContext } from './ImageContext';
import defaultUserImg from "../assets/DefaultUserPicture.jpg";
import defaultAdminImg from "../assets/DefaultAdminPicture.jpg";

export const ImageProvider = ({ children }) => {
  const role = localStorage.getItem('role'); // get the role from localStorage
  const [imageURL, setImageURL] =  useState( localStorage.getItem('isLoggedOut') === 'true' ? defaultAdminImg : localStorage.getItem('defaultAdminImg') || defaultAdminImg);
  const [imageURLClient, setImageURLClient] = useState(localStorage.getItem('isLoggedOut') === 'true' ? defaultUserImg : localStorage.getItem('defaultUserImg') || defaultUserImg);

  const updateImageURLAdmin = (newURL) => {
    setImageURL(newURL);
    localStorage.setItem('defaultAdminImg', newURL);
  };
  const updateImageURLClient = (newURLClient) => {
    setImageURLClient(newURLClient);
    localStorage.setItem('defaultUserImg', newURLClient);
  };

  return (
        <ImageContext.Provider value={{ imageURL, imageURLClient, updateImageURLAdmin, updateImageURLClient }}>
      {children}
    </ImageContext.Provider>
  );
};
