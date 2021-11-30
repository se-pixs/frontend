import { SketchPicker } from 'react-color';
import { useState } from 'react';

interface IProps {
  className?: string;
  name: string;
  description: string;
  defaultColor: any;
  onValueChange: (value: string, name: string) => void;
}

function ColorPicker(props: IProps) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState("#" + ((1 << 24) + (props.defaultColor[0] << 16) + (props.defaultColor[1] << 8) + props.defaultColor[2]).toString(16).slice(1));

  function handler(event: any) {
    setColor(event);
    props.onValueChange(event, props.name);
  }
  return (
    <div className={props.className + ' '}>
      <label className='float-left pr-2'>{props.name + ':'}</label>
      <button className='float-right px-10 py-4 rounded-md' style={{ background: color }} onClick={() => setDisplayColorPicker(!displayColorPicker)}></button>
      {displayColorPicker && (
        <div className='absolute'>
          <div className='fixed' onClick={() => setDisplayColorPicker(!displayColorPicker)} />
          <div style={{ background: color }} className='w-full text-right rounded-t-md flex justify-between'>
            <p className='text-left px-4 py-2 flex-initial font-bold'>{props.name}</p>
            <button onClick={() => setDisplayColorPicker(!displayColorPicker)} className='flex-initial bg-custompurple-200 border-2 border-custompurple-500 hover:bg-custompurple-400 text-black py-1 px-4 text-right rounded-md'>
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
