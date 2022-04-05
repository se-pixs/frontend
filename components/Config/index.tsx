import SliderInput from './SliderInput';
import ValueFieldInput from './ValueFieldInput';
import ColorPicker from './ColorPicker';
import Button from '../Button';

interface IProps {
  configList: any;
  uploaded: boolean;
  runAction: (value: any) => void;
  disabled: boolean;
}

function Config(props: IProps) {
  const className = 'mx-4 my-4 w-full px-2';

  let sliderList;
  let valueFieldInputList;
  let colorPickerList;

  let actionName = props.configList.name;

  if (props.configList.parameters) {
    sliderList = props.configList.parameters.sliders;
    valueFieldInputList = props.configList.parameters.valuefields;
    colorPickerList = props.configList.parameters.colorpickers;
  }

  let sliderMap = new Map();
  let inputFieldMap = new Map();
  let colorPickerMap = new Map();

  function onSliderChange(value: string, name: string) {
    const int_value : number = parseInt(value);
    sliderMap.set(name, int_value);
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
    props.runAction([actionName, arr1, arr2, arr3]);
  }

  type modes = 'notUploaded' | 'disabled' | 'active';
  const modeToShow: modes = props.uploaded ? 'active' : 'notUploaded';

  return (
    <div className='w-full'>
      <p className='text-2xl font-bold mb-4'>Configurations</p>
      <div className='border-2 w-full px-10 py-10 border-customblue-500 rounded-lg flex justify-around'>
        {modeToShow == 'active' && (
          <div>
            <div className={'w-full grid grid-rows-1 place-items-start grid-cols-' + (((sliderList && sliderList.length) > 0 ? 1 : 0) + (valueFieldInputList && valueFieldInputList.length > 0 ? 1 : 0) + (colorPickerList && colorPickerList.length > 0 ? 1 : 0))}>
              {sliderList && sliderList.length > 0 && (
                <div>
                  {sliderList.map(
                    (input: any) => sliderMap.set(input.name, input.value.default) && <SliderInput onValueChange={onSliderChange} key={input.name} name={input.name} description={input.description} step={input.value.step} min={input.value.min} max={input.value.max} value={input.value.default} className={className} />,
                  )}
                </div>
              )}

              {valueFieldInputList && valueFieldInputList.length > 0 && (
                <div>
                  {valueFieldInputList.map(
                    (input: any) =>
                      inputFieldMap.set(input.name, input.value.default) && (
                        <ValueFieldInput onValueChange={onInputFieldChange} type={input.value.type} options={input.value.range} key={input.name} name={input.name} default={input.value.default} description={input.description} className={className} />
                      ),
                  )}
                </div>
              )}
              {colorPickerList && colorPickerList.length > 0 && (
                <div>
                  {colorPickerList.map(
                    (input: any) =>
                      colorPickerMap.set(
                        input.name,
                        Array.from(new Map().set('red', input.value.red.default).set('green', input.value.green.default).set('blue', input.value.blue.default), ([name, value]) => ({ name, value })),
                      ) && <ColorPicker onValueChange={onColorPickerChange} defaultColor={[input.value.red.default, input.value.green.default, input.value.blue.default]} key={input.name} name={input.name} description={input.description} className={className} />,
                  )}
                </div>
              )}
            </div>
            <div className='w-full grid place-items-center'>
              <Button className='mt-8' onclick={() => runAction()} disabled={false}>
                Run action
              </Button>
            </div>
          </div>
        )}
        {modeToShow == 'notUploaded' && (
          <div className='p-20'>
            <p className='text-center text-xl'>You must first upload an image!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Config;
