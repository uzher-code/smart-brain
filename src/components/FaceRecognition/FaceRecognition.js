import React from 'react';
import './FaceRecognition.css'


const FaceRecognition = ({ imageUrl, boxes}) => {

	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id= 'inputImage'alt='' src={imageUrl} width= '500px' height='auto' />
				{
					boxes.map((box, index) => {
					return <div key= {index} className='bounding-box'
					style= {{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow}}
					>
					</div>
					})
				}
			</div>
		</div>
	);
}

export default FaceRecognition;