// Importing necessary components
import React from 'react';
import CustomNavbar from './components/Navbar.jsx';
import CustomJumbotron from './components/Jumbotron.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <div>
      <CustomNavbar />
      <CustomJumbotron />
      {/* Adding other components or content here */}
      <Footer /> {/* This adds the Footer to my app */}
    </div>
  );
};

export default App;