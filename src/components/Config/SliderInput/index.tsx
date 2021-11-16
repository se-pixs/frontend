import { useState } from 'react';

interface IProps {
  className?: string;
  name: string;
  min: number;
  max: number;
  value: number;
  onValueChange: (value: number) => void;
}

function SliderInput(props: IProps) {
  const [value, setValue] = useState(props.value + '');

  function handler(event: any) {
    setValue(event.target.value);
    props.onValueChange(event.target.value);
  }

  return (
    <div className={' ' + props.className}>
      <label className='float-left mr-2'>{props.name + ':'}</label>
      <p className='float-left font-bold'>{value}</p>
      <input className='float-right' type='range' min={props.min} max={props.max} defaultValue={props.value} step='1' onChange={(event) => handler(event)} />
    </div>
  );
}

export default SliderInput;
