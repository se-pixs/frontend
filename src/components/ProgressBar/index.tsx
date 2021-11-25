import { useState } from 'react';
import React from 'react';
import nyanCat from '../../nyanCat.gif';
import rainbow from '../../rainbow.gif';

function ProgressBar(){
  const [completed, setCompleted] = useState(0); 

  React.useEffect(() => {
    setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  }, []);
  
  return (
    <div className="w-full h-10 bg-gray-300 rounded-md">
      <div id="progressBar" style={{width: `${completed}%`, transition: 'width 2s', backgroundSize: "contain" ,backgroundImage: `url("${rainbow}")` }} className="h-full rounded-md text-right">
        <div className="float-right">
          <img src={nyanCat} className="h-10 rounded-r-md" alt="nyan cat" />
        </div>
      </div>
    </div>
  );

}

export default ProgressBar;