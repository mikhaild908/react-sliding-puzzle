import React from 'react';
import logo from './logo.svg';
import './App.css';
import Box from './Box';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Sliding Puzzle
      </header>
      <div className='canvas'>
        <div className='board'>
          <Box id='1' className='square' text='1' draggable={false}/>
          <Box id='2' className='square' text='2' draggable={false}/>
          <Box id='3' className='square' text='3' draggable={false}/>
          <Box id='4' className='square' text='4' draggable={false}/>
          <Box id='5' className='square' text='5' draggable={false}/>
          <Box id='6' className='square' text='6' draggable={false}/>
          <Box id='7' className='square' text='7' draggable={false}/>
          <Box id='8' className='square' text='8' draggable={false}/>
          <Box id='9' className='square' text='9' draggable={false}/>
        </div>
      </div>
    </div>
  );
}


export default App;
