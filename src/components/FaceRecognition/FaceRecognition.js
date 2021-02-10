import React from 'react';
import './FaceRecognition.css'


const FaceRecognition = ({ imageUrl, box}) => {

	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id= 'inputImage'alt='' src={imageUrl} width= '500px' height='auto' />
				{
					box.map((boundries, index) => {
					return <div key= {index} className='bounding-box'
					style= {{top: boundries.topRow, right: boundries.rightCol, left: boundries.leftCol, bottom: boundries.bottomRow}}
					>
					</div>
					})
				}
			</div>
		</div>
	);
}

export default FaceRecognition;