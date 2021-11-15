interface IProps {
    className?: string;
    description: string;
}
  
function ValueFieldInput(props: IProps) {
    return (
        <div  className={props.className + 'flex'}>
            <label className='pr-4 flex-initial'>{props.description}</label>
            <input className='flex-initial'/>
        </div>
    );
}
  
export default ValueFieldInput;  