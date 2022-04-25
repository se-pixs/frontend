import { AreaSelector, IArea } from '@bmunozg/react-image-area';
import { useState, useEffect, useRef  } from 'react';

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
    const [areas, setAreas] = useState<IArea[]>(startUp);
    const i = new Image()
    i.src = props.imageData;

    function startUp(): IArea[] {
        let areas: IArea[] = [];
        for (let i = 0; i < props.areas; i++) {
            areas[i] = {x: props.positionX  + props.width * i, y: props.positionY, width: props.width, height: props.height, unit: 'px', isChanging: false, isNew: false};
            console.log(areas[i])
        }
        console.log(areas);
        return areas;
    }

    const onChangeHandler = (areas: IArea[]) => {
        let currentAreas = areas;
        
        // allow only square areas
        let square = true; // square = true
        if(square){ 
            if(currentAreas[0].width * currentAreas.length + currentAreas[0].x < i.width && currentAreas[0].width <= props.widthMax){
                currentAreas[0].width = currentAreas[0].height;
            }else if(currentAreas[0].height * currentAreas.length + currentAreas[0].y < i.height && currentAreas[0].height <= props.heightMax){
                currentAreas[0].height = currentAreas[0].width;
            }

            if(currentAreas[0].width >= i.width/currentAreas.length){
                currentAreas[0].width = i.width/currentAreas.length;
                currentAreas[0].height = i.width/currentAreas.length;
            }
            if(currentAreas[0].height >= i.height){
                currentAreas[0].height = i.height;
                currentAreas[0].width = i.height;
            }
        }
        
        //sync additonal areas for pano split
        if(currentAreas.length > 1){
            //check for right boarder
            if(currentAreas.length * currentAreas[0].width + currentAreas[0].x > i.width){
                currentAreas[0].x = i.width - currentAreas[0].width * currentAreas.length;
            }
            for(let i = 1; i < currentAreas.length; i++){
                currentAreas[i].x = currentAreas[0].x + currentAreas[0].width *i;
                currentAreas[i].y = currentAreas[0].y;
                currentAreas[i].width = currentAreas[0].width;
                currentAreas[i].height = currentAreas[0].width;
            }
        }

        setAreas(currentAreas);

        //output
        props.onValueChange({ positionX: areas[0].x, positionY: areas[0].y, width: areas[0].width, height: areas[0].height, areas: props.areas }, props.name);
    }

    return (
        <div className={props.className + ' flex items-center'}>
            <AreaSelector mediaWrapperClassName={props.name} areas={areas} maxAreas={props.areas} maxWidth={props.widthMax} minWidth={props.widthMin} maxHeight={props.heightMax} minHeight={props.heightMin} onChange={onChangeHandler}>
                <img className="" src={props.imageData} alt='SelectionImage' />
            </AreaSelector>      
        </div>
    );
}

export default SelectionField;
