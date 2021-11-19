import SliderInput from '../Config/SliderInput';
import ValueFieldInput from '../Config/ValueFieldInput';
import ColorPicker from '../Config/ColorPicker';
import Button from '../Button';

interface IProps {
  configList: any;
}

function Config(props: IProps) {
  const className = 'mx-4 my-4 place-items-center w-full flow-root px-2';

  const sliderList = props.configList[0].sliderInputs.items;
  const valueFieldInputList = props.configList[0].valueFieldInputs.items;
  const colorPickerList = props.configList[0].colorPickers.items;

  let sliderMap = new Map();
  let inputFieldMap = new Map();
  let colorPickerMap = new Map();

  function onSliderChange(value: string, name: string) {
    sliderMap.set(name, value);
  }

  function onInputFieldChange(value: string, name: string) {
    inputFieldMap.set(name, value);
  }

  function onColorPickerChange(value: string, name: string) {
    colorPickerMap.set(name, hexToRGB(value));
  }

  function hexToRGB(value: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
    if (result) {
      let r = parseInt(result[1], 16);
      let g = parseInt(result[2], 16);
      let b = parseInt(result[3], 16);
      return Array.from(new Map().set('red', r).set('green', g).set('blue', b), ([name, value]) => ({ name, value }));
    }
    return null;
  }

  function runAction() {
    let arr1 = Array.from(sliderMap, ([name, value]) => ({ name, value }));
    let arr2 = Array.from(inputFieldMap, ([name, value]) => ({ name, value }));
    let arr3 = Array.from(colorPickerMap, ([name, value]) => ({ name, value }));
    let output = JSON.stringify([arr1, arr2, arr3]);
    console.log(output);
    return output;
  }

  return (
    <div className='w-full'>
      <p className='text-2xl font-bold mb-4'>Configurations</p>
      <div className='border-2  w-full px-10 py-10 border-customblue-500 rounded-lg'>
        <div className={'w-full grid grid-rows-1 place-items-start grid-cols-' + ((sliderList.length > 0 ? 1 : 0) + (valueFieldInputList.length > 0 ? 1 : 0) + (colorPickerList.length > 0 ? 1 : 0))}>
          {sliderList.length > 0 && (
            <div>
              {sliderList.map(
                (input: any) =>
                  sliderMap.set(input.sliderInput.name, input.sliderInput.value) && <SliderInput onValueChange={onSliderChange} key={input.sliderInput.name} name={input.sliderInput.name} min={input.sliderInput.min} max={input.sliderInput.max} value={input.sliderInput.value} className={className} />,
              )}
            </div>
          )}
          {valueFieldInputList.length > 0 && (
            <div>
              {valueFieldInputList.map(
                (input: any) => inputFieldMap.set(input.valueFieldInput.name, '') && <ValueFieldInput onValueChange={onInputFieldChange} key={input.valueFieldInput.name} name={input.valueFieldInput.name} description={input.valueFieldInput.description} className={className} />,
              )}
            </div>
          )}
          {colorPickerList.length > 0 && <div>{colorPickerList.map((input: any) => colorPickerMap.set(input.colorPicker.name, hexToRGB('#0C7ECF')) && <ColorPicker onValueChange={onColorPickerChange} key={input.colorPicker.name} name={input.colorPicker.name} className={className} />)}</div>}
        </div>
        <div className='w-full grid place-items-center'>
          <Button className='mt-8' onclick={() => runAction()} disabled={false}>
            Run action
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Config;
