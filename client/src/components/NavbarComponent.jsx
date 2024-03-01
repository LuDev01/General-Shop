// <!-- <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link rel="stylesheet" href="./styles.css">
//     <title>Document</title>
// </head>
// <body>
//     <header>
//         <a href="#" class="logo">Logo</a>
//         <div class="group">
//             <ul class="navigation">
//                 <li><a href="#">Home</a></li>
//                 <li><a href="#">About Us</a></li>
//                 <li><a href="#">Categories</a></li>
//             </ul>
//             <div class="search">
//                 <span class="icon">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search searchBtn" viewBox="0 0 16 16">
//                         <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
//                     </svg>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg closeBtn" viewBox="0 0 16 16">
//                         <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
//                     </svg>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list menuToggle" viewBox="0 0 16 16">
//                         <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
//                     </svg>
//                 </span>
//             </div>
//             <div class="searchBox">
//                 <input type="text" placeholder="Search here . . . ">
//             </div>
//         </div>
//     </header>
//     <script>
//         let searchBtn = document.querySelector('.searchBtn')
//         let closeBtn = document.querySelector('.closeBtn')
//         let searchBox = document.querySelector('.searchBox')
//         let navigation = document.querySelector('.navigation')
//         let menuToggle = document.querySelector('.menuToggle')
//         let header = document.querySelector('header')

//         searchBtn.onclick = function(){
//             searchBox.classList.add('active')
//             closeBtn.classList.add('active')
//             searchBtn.classList.add('active')
//             menuToggle.classList.add('hide')
//             header.classList.remove('open')
//         }
//         closeBtn.onclick = function(){
//             searchBox.classList.remove('active')
//             closeBtn.classList.remove('active')
//             searchBtn.classList.remove('active')
//             menuToggle.classList.remove('hide')
//         }
//         menuToggle.onclick = function(){
//             header.classList.toggle('open')
//             searchBox.classList.remove('active')
//             closeBtn.classList.remove('active')
//             searchBtn.classList.remove('active')
//         }

//     </script>
// </body>
// </html> -->

// import React, { useState } from 'react';

// const Header = () => {
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleSearchClick = () => {
//     setIsSearchActive(true);
//     setIsMenuOpen(false);
//   };

//   const handleCloseClick = () => {
//     setIsSearchActive(false);
//   };

//   const handleMenuToggleClick = () => {
//     setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
//     setIsSearchActive(false);
//   };

//   return (
//     <header>
//       <a href="#" className="logo">
//         Logo
//       </a>
//       <div className="group">
//         <ul className={`navigation ${isMenuOpen ? 'open' : ''}`}>
//           <li>
//             <a href="#">Home</a>
//           </li>
//           <li>
//             <a href="#">About Us</a>
//           </li>
//           <li>
//             <a href="#">Categories</a>
//           </li>
//         </ul>
//         <div className={`search ${isSearchActive ? 'active' : ''}`}>
//           <span className="icon">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               className="bi bi-search searchBtn"
//               viewBox="0 0 16 16"
//               onClick={handleSearchClick}
//             >
//               {/* SVG path here */}
//             </svg>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               className="bi bi-x-lg closeBtn"
//               viewBox="0 0 16 16"
//               onClick={handleCloseClick}
//             >
//               {/* SVG path here */}
//             </svg>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               className="bi bi-list menuToggle"
//               viewBox="0 0 16 16"
//               onClick={handleMenuToggleClick}
//             >
//               {/* SVG path here */}
//             </svg>
//           </span>
//         </div>
//         <div className={`searchBox ${isSearchActive ? 'active' : ''}`}>
//           <input type="text" placeholder="Search here . . . " />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
