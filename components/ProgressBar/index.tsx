import { useState } from 'react';
import React from 'react';

interface IProps {
  className?: string;
  response: boolean;
  onEnd: () => void;
}

function ProgressBar(props: IProps) {
  const [completed, setCompleted] = useState(0);
  const nyanCat = '/nyanCat.gif';
  const rainbow = '/rainbow.gif';
  
  let progress = 0;

  React.useEffect(() => {
    let id = setInterval(() => {
      if(progress < 80){
        progress = progress + 1; 
        setCompleted(progress);
      }else{
        clearInterval(id);
      }
    }, 10);
  },[]);

  React.useEffect(() => {
    let id = setInterval(() => {
      if(props.response){
        progress = progress + 1; 
        setCompleted(progress);
      }

      if(progress >= 100){
        clearInterval(id);
        setTimeout(() => {
          props.onEnd();
        }, 700)
      }
    }, 10);
  },[props.response]);

  return (
    <div className={'bg-customblue-500 p-3 rounded-lg mx-10' + ' ' + props.className}>
      <div className={'w-full h-10 bg-customblue-200 rounded-md'}>
        <div
          id='progressBar'
          style={{
            width: `${completed}%`,
            transition: 'width 0.1s',
            backgroundSize: 'contain',
            backgroundImage: `url(${rainbow})`,
            minWidth: '63px',
          }}
          className='h-full rounded-md text-right'>
          <div className='float-right'>
            <img src={nyanCat} className='h-10 rounded-md' alt='nyan cat' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
