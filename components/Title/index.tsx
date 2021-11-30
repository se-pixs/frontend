interface IProps {
  className?: string;
  title: string;
  description: string;
}

function Title(props: IProps) {
  return (
    <div className='mb-10'>
      <p className='text-3xl font-bold'>{props.title}</p>
      <p className='text-xl'>{props.description}</p>
    </div>
  );
}

export default Title;
