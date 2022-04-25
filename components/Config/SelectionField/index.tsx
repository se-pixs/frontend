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
    const [areas, setAreas] = useState<IArea[]>([{x: props.positionX, y: props.positionY, width: props.width, height: props.height, unit: 'px', isChanging: false, isNew: false}]);
    const i = new Image()
    i.src = props.imageData;

    const onChangeHandler = (areas: IArea[]) => {
        let currentAreas = areas;
        
        let square = true; // square = true
        if(square){ 
            if(currentAreas[0].width + currentAreas[0].x !== i.width && currentAreas[0].width + currentAreas[0].x <= props.widthMax){
                currentAreas[0].width = currentAreas[0].height;
            }else if(currentAreas[0].height + currentAreas[0].y !== i.height && currentAreas[0].height + currentAreas[0].y <= props.heightMax){
                currentAreas[0].height = currentAreas[0].width;
            }            
            if(currentAreas[0].width >= i.width || currentAreas[0].height >= i.height){
                currentAreas[0].width = Math.min(i.width,i.height);
                currentAreas[0].height = Math.min(i.width,i.height);
            }
        }
        
        setAreas(currentAreas);

        //output
        props.onValueChange({ positionX: areas[0].x, positionY: areas[0].y, width: areas[0].width, height: areas[0].height, areas: props.areas }, props.name);
    }

    return (
        <div className={props.className + ' flex items-center'}>
            <AreaSelector mediaWrapperClassName={props.name} areas={areas} maxAreas={1} maxWidth={props.widthMax} minWidth={props.widthMin} maxHeight={props.heightMax} minHeight={props.heightMin} debug={true} onChange={onChangeHandler}>
                <img src={props.imageData} alt='SelectionImage' height='fill' width='fill' />
            </AreaSelector>      
        </div>
    );
}

export default SelectionField;
