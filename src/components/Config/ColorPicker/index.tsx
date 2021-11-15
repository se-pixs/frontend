import { SketchPicker } from 'react-color';
import { useState } from 'react';
interface IProps {
    className?: string;
    description: string;
}
  
function ColorPicker(props: IProps) {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState("#0C7ECF");
    return (    
        <div className={props.className + ' '}>    
            <label className='flex-initial pr-2'>{props.description}</label>
            <button className='px-6 py-4' style={{background: color}}  onClick={() => setDisplayColorPicker(!displayColorPicker) }></button>

            {displayColorPicker ? <div className='absolute'>
            <div className='fixed' onClick={() => setDisplayColorPicker(!displayColorPicker) }/>
            <SketchPicker disableAlpha className='' color={color} onChange={(color) => {setColor(color.hex)}} onChangeComplete={(color) => {setColor(color.hex)}}/>
            </div>
            : null }        
        </div>
    );

}
  
export default ColorPicker;  