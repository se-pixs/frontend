import { SketchPicker } from 'react-color';
import { useState } from 'react';
import { getContrastColor } from '../../../utils/color';

interface IProps {
  className?: string;
  name: string;
  description: string;
  defaultColor: any;
  onValueChange: (value: string, name: string) => void;
}

function ColorPicker(props: IProps) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState('#' + ((1 << 24) + (props.defaultColor[0] << 16) + (props.defaultColor[1] << 8) + props.defaultColor[2]).toString(16).slice(1));
  const [textColor, setTextColor] = useState(getContrastColor(color));

  function handler(event: any) {
    setColor(event);
    props.onValueChange(event, props.name);
    setTextColor(getContrastColor(color));
  }

  const actionNameToUpper: string = props.name.charAt(0).toUpperCase() + props.name.slice(1);

  return (
    <div className={props.className + ' flex items-center'}>
      <label className='mr-4'>{actionNameToUpper}</label>
      <button className='px-10 py-4 rounded-md' style={{ background: color }} onClick={() => setDisplayColorPicker(!displayColorPicker)}></button>
      {displayColorPicker && (
        <div className='absolute'>
          <div className='fixed' onClick={() => setDisplayColorPicker(!displayColorPicker)} />
          <div style={{ background: color }} className='w-full text-right rounded-t-md flex justify-between'>
            <p className='text-left px-4 py-2 flex-initial font-bold' style={{ color: textColor }}>
              {actionNameToUpper}
            </p>
            <button onClick={() => setDisplayColorPicker(!displayColorPicker)} className='flex-initial bg-white hover:bg-custompurple-100 text-black py-1 px-4 text-right '>
              Close
            </button>
          </div>
          <SketchPicker
            disableAlpha
            className=''
            color={color}
            onChange={(color) => {
              handler(color.hex);
            }}
            onChangeComplete={(color) => {
              handler(color.hex);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
