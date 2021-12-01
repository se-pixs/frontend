import { useState } from 'react';
import React from 'react';

interface IProps {
  className?: string;
}

function ProgressBar(props: IProps) {
  const [completed, setCompleted] = useState(0);
  const nyanCat = '/nyanCat.gif';
  const rainbow = '/rainbow.gif';

  React.useEffect(() => {
    setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  }, []);

  return (
    <div className={'bg-customblue-500 p-3 rounded-lg mx-10' + ' ' + props.className}>
      <div className={'w-full h-10 bg-customblue-200 rounded-md'}>
        <div
          id='progressBar'
          style={{
            width: `${completed}%`,
            transition: 'width 2s',
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
