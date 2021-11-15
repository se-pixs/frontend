import { SketchPicker } from 'react-color';
import { useState } from 'react';
interface IProps {
    className?: string;
    name: string;
}
  
function ColorPicker(props: IProps) {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState("#0C7ECF");
    return (    
        <div className={props.className + ' '}>    
            <label className='float-left pr-4'>{props.name + ':'}</label>
            <button className='float-right px-8 py-3' style={{background: color}}  onClick={() => setDisplayColorPicker(!displayColorPicker) }></button>

            {displayColorPicker ? <div className='absolute'>
            <div className='fixed' onClick={() => setDisplayColorPicker(!displayColorPicker) }/>
            <SketchPicker disableAlpha className='' color={color} onChange={(color) => {setColor(color.hex)}} onChangeComplete={(color) => {setColor(color.hex)}}/>
            </div>
            : null }        
        </div>
    );

}
  
export default ColorPicker;  