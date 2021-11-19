import { useState } from 'react';

interface IProps {
  className?: string;
  name: string;
  onValueChange: (value: string) => void;
}

function ValueFieldInput(props: IProps) {
  const [value, setValue] = useState('');

  function handler(event: any) {
    setValue(event.target.value);
    props.onValueChange(event.target.value);
  }

  return (
    <div className={props.className + ' '}>
      <label className='pr-4 float-left'>{props.name + ':'}</label>
      <input placeholder='...' className='float-right px-2 w-20' onChange={(event) => handler(event)} />
    </div>
  );
}

export default ValueFieldInput;
