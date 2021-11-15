interface IProps {
    className?: string;    
    description: string;
    min: number, 
    max: number, 
    value: number
}
  
function SliderInput(props: IProps) {
    return (
        <div className={('flex ' + props.className)}>
            <label className='flex-initial'>{props.description}</label>
            <input className='flex-initial' type="range" min={props.min} max={props.max} defaultValue={props.value} step="1" onChange={(event) => handleChange(event.target.value)}/>
        </div>
    );
}

function handleChange(value: string) {

}
  
export default SliderInput;  