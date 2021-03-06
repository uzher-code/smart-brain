import React from 'react';
import './Form.css';

const NameField = ({ onNameChange }) =>{
	return (
		<div className="mt3">
	        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
	        <input 
	        	className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
	        	type="text" 
	        	name="name"
	        	id="name"
	        	onChange= {onNameChange}
	        />
	    </div>
	)
}

export default NameField;