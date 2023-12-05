import React, { useState } from 'react';
import defaultUserImg from "./assets/DefaultUserPicture.jpg";

export const Profile=()=> {
  const [image, setImage] = useState(defaultUserImg); // Set the initial image

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    }

    reader.readAsDataURL(file);
  }

  return (
    <div>
      <img src={image} style={{borderRadius:'50%',width:'32px',height:'32px'}} alt="profile" />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
}


