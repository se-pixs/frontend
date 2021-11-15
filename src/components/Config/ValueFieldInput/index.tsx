import { useState } from 'react';

interface IProps {
    className?: string;
    name: string;
}
  
function ValueFieldInput(props: IProps) {
    const [value, setValue] = useState('');
    return (
        <div  className={props.className + ' ' }>
            <label className='pr-4 float-left'>{props.name + ':'}</label>
            <input placeholder="type in ..." className='float-right px-2 w-28' onChange={(event) => (setValue(event.target.value))}/>
        </div>
    );
}
  
export default ValueFieldInput;  