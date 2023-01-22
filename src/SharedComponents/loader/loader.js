import React from 'react'
import "./loader.css"
function Loader() {
  return (
    <div className="loader_main">
      <div className="gooey">
        <span className="dot"></span>
        <div className="dots">
          <span className='loader_span'></span>
          <span className='loader_span'></span>
          <span className='loader_span'></span>
        </div>
      </div>
    </div>
  );
}

export default Loader