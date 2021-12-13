import { useState } from 'react';

interface IProps {
  className?: string;
  name: string;
  description: string;
  min: number;
  max: number;
  value: number;
  step: number;
  onValueChange: (value: string, name: string) => void;
}

function SliderInput(props: IProps) {
  const [value, setValue] = useState(props.value + '');

  function handler(event: any) {
    setValue(event.target.value);
    props.onValueChange(event.target.value + '', props.name);
  }
  const actionNameToUpper: string = props.name.charAt(0).toUpperCase() + props.name.slice(1);

  return (
    <div className={'flex flex-col ' + props.className}>
      <div className='w-full flex justify-between'>
        <label className='mr-2'>{actionNameToUpper}</label>
        <p className='font-bold mr-2'>{value}</p>
      </div>
      <input className='w-full outline-none' type='range' min={props.min} max={props.max} defaultValue={props.value} step={props.step} onChange={(event) => handler(event)} />
    </div>
  );
}

export default SliderInput;
