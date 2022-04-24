import { AreaSelector, IArea } from '@bmunozg/react-image-area';
import { useState } from 'react';

interface IProps {
    className?: string;
    name: string;
    description: string;
    imageData: string;
    positionX: number;
    positionXmin: number;
    positionXmax: number; 
    positionY: number;
    positionYmin: number;
    positionYmax: number;
    width: number; 
    widthMin: number;
    widthMax: number;
    height: number;
    heightMin: number;
    heightMax: number;
    areas: number;
    areasMin: number;
    areasMax: number;
    onValueChange: (value: any, name: string) => void;
}

function SelectionField(props: IProps) {
    const [areas, setAreas] = useState<IArea[]>([]);
    const onChangeHandler = (areas: IArea[]) => {
        setAreas(areas);
        let value = { positionX: areas[0].x, positionY: areas[0].y, width: areas[0].width, height: areas[0].height, areas: props.areas };
        props.onValueChange(value, props.name);
    }
    return (
        <div className={props.className + ' flex items-center'}>
            <AreaSelector mediaWrapperClassName={props.name} areas={areas} maxAreas={props.areasMax} minWidth={props.widthMin} minHeight={props.heightMin} debug={true} onChange={onChangeHandler}>
                <img src={props.imageData} alt='SelectionImage' height='fill' width='fill' />
            </AreaSelector>      
        </div>
    );
}

export default SelectionField;
