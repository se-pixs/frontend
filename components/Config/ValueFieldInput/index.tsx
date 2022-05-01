interface IProps {
  className?: string;
  name: string;
  description: string;
  type: string;
  options: any;
  default: string;
  onValueChange: (value: string, name: string, type: string) => void;
}

function ValueFieldInput(props: IProps) {
  function handler(event: any) {
    props.onValueChange(event.target.value, props.name, props.type);
  }

  const customClass = ' flex-auto border border-gray-400 rounded-md pl-1 pr-2 py-1 outline-none focus:ring-2 focus:ring-custompurple-400';
  const actionNameToUpper: string = props.name.charAt(0).toUpperCase() + props.name.slice(1);

  return (
    <div className={props.className + ' flex justify-between'}>
      <label className='flex-auto py-1 mr-2'>{actionNameToUpper}</label>
      {props.type !== 'dropdown' ? (
        <input className={customClass} defaultValue={props.default} onChange={(event) => handler(event)} />
      ) : (
        <select className={customClass} defaultValue={props.default} onChange={handler} placeholder='Select an option'>
          {props.options.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default ValueFieldInput;
