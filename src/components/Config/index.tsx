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

  function onSliderChange(value: number) {
    console.log(value);
  }

  function onInputFieldChange(value: string) {
    console.log(value);
  }

  function onColorPickerChange(value: string) {
    console.log(value);
  }

  return (
    <div className='w-full'>
      <p className='text-2xl font-bold mb-4'>Configurations</p>
      <div className='border-2  w-full px-10 py-10 border-customblue-500 rounded-lg'>
        <div className={'w-full grid grid-rows-1 place-items-start grid-cols-' + ((sliderList.length > 0 ? 1 : 0) + (valueFieldInputList.length > 0 ? 1 : 0) + (colorPickerList.length > 0 ? 1 : 0))}>
          {sliderList.length > 0 && (
            <div>
              {sliderList.map((input: any) => (
                <SliderInput onValueChange={onSliderChange} key={input.sliderInput.name} name={input.sliderInput.name} min={input.sliderInput.min} max={input.sliderInput.max} value={input.sliderInput.value} />
              ))}
            </div>
          )}
          {valueFieldInputList.length > 0 && (
            <div>
              {valueFieldInputList.map((input: any) => (
                <ValueFieldInput onValueChange={onInputFieldChange} key={input.valueFieldInput.name} name={input.valueFieldInput.name} className={className} />
              ))}
            </div>
          )}
          {colorPickerList.length > 0 && (
            <div>
              {colorPickerList.map((input: any) => (
                <ColorPicker onValueChange={onColorPickerChange} key={input.colorPicker.name} name={input.colorPicker.name} className={className} />
              ))}
            </div>
          )}
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

function runAction() {}

export default Config;
