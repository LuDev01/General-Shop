import React from 'react'; //  Imports the React library. React is a JavaScript library used for building user interfaces.
import ReactDOM from 'react-dom/client'; //Imports the ReactDOM module from the react-dom package. The .client part is used to import the client-side renderer.
import App from './App'; //Imports the App component from the './App' file
import 'bootstrap/dist/css/bootstrap.min.css'; //Imports the Bootstrap CSS file, providing styling for the application. Bootstrap is a popular CSS framework for building responsive and visually appealing web pages.
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Creates a root for the React application using ReactDOM.createRoot. This root is associated with an HTML element with the ID 'root', typically the container where the React app will be rendered.
root.render(
  <React.StrictMode> {/*Wraps the App component with React.StrictMode. This is used for detecting and highlighting potential problems in the application during the development phase.*/}
    <App /> {/*Shows the App component, which represents the main structure of the React application.*/}
  </React.StrictMode>
);
