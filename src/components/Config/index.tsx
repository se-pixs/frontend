import SliderInput from '../Config/SliderInput';
import ValueFieldInput from '../Config/ValueFieldInput';
import ColorPicker from '../Config/ColorPicker';
import Button from '../Button';

interface IProps {
    configList: any;
}

function Config(props: IProps){
    return (
        <div className='w-full'>
            <p className='text-2xl font-bold mb-4'>Configurations</p>
            <div className='border-2  w-full px-20 py-20 border-customblue-500 rounded-lg'>
                <div className='w-full grid grid-cols-2 grid-rows-3 place-items-start'>
                {props.configList[0].sliderInputs.items.map((input: any) => (
                <SliderInput key={input.sliderInput.name} className='flex-initial mx-4' description={input.sliderInput.description} min={input.sliderInput.min} max={input.sliderInput.max} value={input.sliderInput.value} />
                ))}
                {props.configList[0].valueFieldInputs.items.map((input: any) => (
                <ValueFieldInput key={input.valueFieldInput.name} description={input.valueFieldInput.description} className='flex-initial mx-4' />
                ))}
                {props.configList[0].colorPickers.items.map((input: any) => (
                <ColorPicker key={input.colorPicker.name} description={input.colorPicker.description} className='flex-initial mx-4'/>
                ))}
                </div>
                <div className='w-full grid place-items-center'>
                    <Button className='mt-8' onclick={() => runAction()} disabled={false}>Run action</Button>
                </div>
            </div>
        </div>
    );
}

function runAction(){
    
}

export default Config;