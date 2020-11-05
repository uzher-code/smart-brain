import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';


const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt 
				className ='Tilt br2 shadow-2'
				perspective={800}
    			transitionSpeed={1500}
    		>
    			<div className='pa3'>
        			<img style= {{paddingTop: '5px'}}alt='Logo' src={brain}/>
        		</div>
    		</Tilt>
		</div>
	);
}

export default Logo;