import React from 'react'
import { FaPlane } from 'react-icons/fa';

export const FloatingButton = ({isTravler}) => {
    
  return (
    <div>
      {!isTravler ? (
        ""
      ) : (
        <a href='/new-flight' className="fixed bottom-32 right-36 z-10 bg-blue-500 hover:bg-orange-700 text-white font-bold p-6 rounded-full">
          <FaPlane
            size={36}
            color="#ffffff"
            style={{ transform: "rotate(-45deg)" }}
          ></FaPlane>
        </a>
      )}
    </div>
  );
}
