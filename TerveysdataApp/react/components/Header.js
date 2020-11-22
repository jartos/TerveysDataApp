import React from 'react';
import '../App.css';


const Header = () => {
  return (
      <div>
        <header><h1 contenteditable>Header.com</h1></header>
        <div class="left-sidebar" contenteditable>Left Sidebar</div>
        <main contenteditable></main>
        <div class="right-sidebar" contenteditable>Right Sidebar</div>
        <footer contenteditable>Footer Content — Header.com 2020</footer>
      </div>
  );
};

export default Header;

