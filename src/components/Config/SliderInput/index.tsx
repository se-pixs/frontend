import { useState } from 'react';

interface IProps {
  className?: string;
  name: string;
  min: number;
  max: number;
  value: number;
  onValueChange: (value: string, name: string) => void;
}

function SliderInput(props: IProps) {
  const [value, setValue] = useState(props.value + '');

  function handler(event: any) {
    setValue(event.target.value);
    props.onValueChange(event.target.value + '', props.name);
  }

  return (
    <div className={' ' + props.className}>
      <label className='float-left mr-2'>{props.name + ':'}</label>
      <div className='w-4 float-left'><p className='font-bold'>{value}</p></div>
      <input className='float-right bg-red outline-none' type='range' min={props.min} max={props.max} defaultValue={props.value} step='1' onChange={(event) => handler(event)} />
    </div>
  );
}

export default SliderInput;
