import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';
import Navbar from './components/navbar';
import Footer from './components/footer';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <Main/>
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);
