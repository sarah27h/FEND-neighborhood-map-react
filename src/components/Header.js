import React, { Component } from 'react';

export class Header extends Component {
    render() {
  
      return (
        <header className="header">
            <a id="menu" className="header__menu">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"></path>
                </svg>
            </a>
            <h1>Museums Guide</h1>
        </header>
      )
    }
}


export default Header;