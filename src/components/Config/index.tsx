import SliderInput from '../Config/SliderInput';
import ValueFieldInput from '../Config/ValueFieldInput';
import ColorPicker from '../Config/ColorPicker';
import Button from '../Button';

interface IProps {
    configList: any;
}

function Config(props: IProps){
    const className = 'm-4 place-items-center flow-root';
    return (
        <div className='w-full'>
            <p className='text-2xl font-bold mb-4'>Configurations</p>
            <div className='border-2  w-full px-24 py-10 border-customblue-500 rounded-lg'>
                <div className={'w-full grid grid-rows-1 place-items-start grid-cols-' + ((props.configList[0].sliderInputs.items.length > 0 ? 1 : 0) + (props.configList[0].valueFieldInputs.items.length > 0 ? 1 : 0) + (props.configList[0].colorPickers.items.length > 0 ? 1 : 0))}>
                    { props.configList[0].sliderInputs.items.length > 0 ?<div>
                    {props.configList[0].sliderInputs.items.map((input: any) => (
                    <SliderInput key={input.sliderInput.name} className={className} name={input.sliderInput.name} min={input.sliderInput.min} max={input.sliderInput.max} value={input.sliderInput.value} />
                    ))}
                    </div> : null}
                    {props.configList[0].valueFieldInputs.items.length > 0 ? <div>
                    {props.configList[0].valueFieldInputs.items.map((input: any) => (
                    <ValueFieldInput key={input.valueFieldInput.name} name={input.valueFieldInput.name} className={className} />
                    ))}
                    </div> : null}
                    {props.configList[0].colorPickers.items.length > 0 ? <div>
                    {props.configList[0].colorPickers.items.map((input: any) => (
                    <ColorPicker key={input.colorPicker.name} name={input.colorPicker.name} className={className}/>
                    ))}
                    </div> : null}           
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