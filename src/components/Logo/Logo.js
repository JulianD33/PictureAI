import React from 'react';
import ReactDOM from 'react-dom';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
	<div className='ma4 mt0'>
	<Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 140, width: 140 }} >
      <div className="Tilt-inner pa1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h1><img alt="brain" style={{maxWidth: 100, maxHeight: 100}} src={brain}/></h1>
      </div>
    </Tilt>
	</div>
  );
}

ReactDOM.render(<Logo />, document.getElementById('root'));
export default Logo;