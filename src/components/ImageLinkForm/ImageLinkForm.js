import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
	<div className='ma4 mt0'>
   <p className='f3'>
   {'Julian will detect faces in your pictures. Give it a try!'}
   </p>
   <div className='center'>
   <div className=' form center pa4 br3 shadow-5'>
   <input className='f4 pa2 w-70 center' type='tex' placeholder="Insert your image link here" onChange={(event) => onInputChange(event, 'text')} />
   <button 
   className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
   style ={{background: 'linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)'}}
   onClick={onPictureSubmit} >Detect</button>
   </div>
   </div>
	</div>
  );
}


export default ImageLinkForm;