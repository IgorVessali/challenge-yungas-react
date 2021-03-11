import React from "react";

const Modal = ({id='modal', title, children, onClose= () =>{}}) => {
  const handleOutSideClick = (e) => {
    if (e.target.id === id) onClose()
  }
  return <div id={id} className='modal' onClick={handleOutSideClick}>
    <div className='container'>
      <button className= 'close' onClick={onClose}/>
      <h1 className='title'>{title}</h1>
      <hr class="solid"/>
      <div className='content'>{children}</div>
    </div>
  </div>
} 
export default Modal