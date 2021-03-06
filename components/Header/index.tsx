function Header() {
  const pixsLogo = (
    <svg xmlns='http://www.w3.org/2000/svg' width='380' height='387.757' viewBox='0 0 85 102.594' fill='currentColor' className='w-8 h-8'>
      <g strokeWidth='0.265' transform='translate(-61.5 -103.57)'>
        <text x='56.814' y='206.165' fontFamily='sans-serif' fontSize='141.11' style={{ lineHeight: '1.25' }}>
          <tspan x='56.814' y='206.165'>
            X
          </tspan>
        </text>
        <path d='M101.04 177.59h7.825v23.814h-7.825z'></path>
        <circle cx='106.31' cy='125.37' r='3.912'></circle>
      </g>
      <text x='-4.294' y='65.267' strokeWidth='0.245' fontFamily='sans-serif' fontSize='46.997' transform='scale(.9425 1.06102)' style={{ lineHeight: '1.25' }}>
        <tspan x='-4.294' y='65.267'>
          P
        </tspan>
      </text>
      <text x='67.641' y='64.337' strokeWidth='0.246' fontFamily='sans-serif' fontSize='48.005' transform='scale(.9475 1.05541)' style={{ lineHeight: '1.25' }}>
        <tspan x='67.641' y='64.337'>
          S
        </tspan>
      </text>
    </svg>
  );
  const ghLogo = (
    <svg aria-hidden='true' focusable='false' data-prefix='fab' data-icon='github' className='w-10 h-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 496 512'>
      <path
        fill='currentColor'
        d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'></path>
    </svg>
  );

  return (
    <header className='bg-customblue-500 py-8'>
      <div className='px-5 flex justify-between w-full text-customwhite-500 items-center'>
        <div className='flex-initial flex items-center'>
          <p className='flex-initial pr-5'>{pixsLogo}</p>
          <p className='flex-initial text-left text-2xl font-bold'>PiXS - Image Manipulation Extended</p>
        </div>
        <div className='flex-initial float-right text-white'>
          <a href='https://github.com/se-pixs' className='hover:text-custompurple-500' target='_blank' rel='noreferrer'>
            {ghLogo}
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
