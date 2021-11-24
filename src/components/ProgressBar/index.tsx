import { useState } from 'react';
import React from 'react';

function ProgressBar(){
  const [completed, setCompleted] = useState(0); 

  React.useEffect(() => {
    setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  }, []);
  
  return (
    <div className="w-full h-10 bg-gray-300 rounded-md">
      <div style={{width: `${completed}%`, transition: 'width 2s'}} className="h-full bg-customblue-500 rounded-md text-right">
        <img src="https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif" className="float-right w-16 rounded-md" alt="nyan cat" />
      </div>
    </div>
  );

}

export default ProgressBar;