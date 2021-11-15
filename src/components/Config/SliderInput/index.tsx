import { useState } from 'react';

interface IProps {
    className?: string;    
    name: string;
    min: number, 
    max: number, 
    value: number
}
  
function SliderInput(props: IProps) {
    const [value, setValue] = useState(props.value + '');
    return (
        <div className={(' ' + props.className)}>
            <label className='float-left mr-2'>{props.name + ':'}</label>
            <p className='float-none font-bold mr-4'>{value}</p>
            <input className='float-right' type="range" min={props.min} max={props.max} defaultValue={props.value} step="1" onChange={(event) => setValue(event.target.value)}/>
        </div>
    );
}
  
export default SliderInput;  