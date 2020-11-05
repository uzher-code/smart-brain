import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
	return (
		<div className=''>
			<p className='f3'>
			{'This app will detect faces in you pictures. Give it a try'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5' onChange ={onInputChange}>
					<input className='f4 pa2 w-70 center' type='text' />
					<button 
						className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
						onClick = {onPictureSubmit}
					>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;