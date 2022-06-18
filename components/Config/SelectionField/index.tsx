import { AreaSelector, IArea } from '@bmunozg/react-image-area';
import { useState, useEffect, useRef  } from 'react';
import ValueFieldInput from '../ValueFieldInput';
import SliderInput from '../SliderInput';

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
    const [areas, setAreas] = useState<IArea[]>(startUp(props.areas));

    const [numberAreas, setNumberAreas] = useState(props.areas);
    const [ratio, setRatio] = useState("Free");

    const i = new Image()
    i.src = props.imageData;

    function startUp(value: number): IArea[] {
        let newAreas: IArea[] = [];
        for (let i = 0; i < value; i++) {
            if(areas && areas[0]){   
                newAreas[i] = {x: areas[0].x  + areas[0].width * i, y: areas[0].y, width: areas[0].width, height: areas[0].height, unit: 'px', isChanging: false, isNew: false};
            }else{
                newAreas[i] = {x: props.positionX  + props.width * i, y: props.positionY, width: props.width, height: props.height, unit: 'px', isChanging: false, isNew: false};
            }
        }
        newAreas = checkRatio(newAreas);
            
        return newAreas;
    }

    const onChangeHandler = (areas: IArea[]) => {
        let currentAreas = areas;
        
        // allow only square areas
        currentAreas = checkRatio(currentAreas);

        if(currentAreas[0].width >= i.width/currentAreas.length){
            currentAreas[0].width = i.width/currentAreas.length;
            currentAreas[0].height = i.width/currentAreas.length;
            console.log("hier")
        }
        if(currentAreas[0].height >= i.height){
            currentAreas[0].height = i.height;
            currentAreas[0].width = i.height;
        }
        if(currentAreas.length * currentAreas[0].width + currentAreas[0].x > i.width){
            currentAreas[0].x = i.width - currentAreas[0].width * currentAreas.length;
        }
        
        //sync additonal areas for pano split
        if(currentAreas.length > 1){            
            for(let i = 1; i < currentAreas.length; i++){
                currentAreas[i].x = currentAreas[0].x + currentAreas[0].width *i;
                currentAreas[i].y = currentAreas[0].y;
                currentAreas[i].width = currentAreas[0].width;
                currentAreas[i].height = currentAreas[0].height;
            }
        }

        setAreas(currentAreas);

        //output
        props.onValueChange({ positionX: areas[0].x, positionY: areas[0].y, width: areas[0].width, height: areas[0].height, areas: numberAreas }, props.name);
    }

    function checkRatio(areas: IArea[]): IArea[] {
        let rat;
        switch(ratio){
            case "1:1":
                rat = [1,1];
                break;
            default: //Free
                break;
        }
        if(rat) { 
            if(areas[0].width * areas.length + areas[0].x < i.width && areas[0].width <= props.widthMax){
                areas[0].width = areas[0].height * rat[0] / rat[1];
            }
        }
        return areas;
    }

    function onInputFieldChange(value: string) {
        setRatio(value);
    }

    function onSliderChange(value: string){
        setNumberAreas(parseInt(value));
        setAreas(startUp(parseInt(value)));
    }

    return (
        <div>
            <div className={props.className + ' flex items-center'}>
                <AreaSelector mediaWrapperClassName={props.name} areas={areas} maxAreas={props.areas} maxWidth={props.widthMax} minWidth={props.widthMin} debug={false} maxHeight={props.heightMax} minHeight={props.heightMin} onChange={onChangeHandler}>
                    <img className="" src={props.imageData} alt='SelectionImage' />
                </AreaSelector>                  
            </div>
            <div className="items-center justify-center">
                <ValueFieldInput onValueChange={onInputFieldChange} type={'dropdown'} options={["1:1","Free"]} key={"RatioSelector"} name={"RatioSelector"} default={ratio} description={"RatioSelector"} className="mx-4 my-4 w-full px-2" />
                
                {props.areasMax > 1 &&
                    <SliderInput onValueChange={onSliderChange} key={'slider'} name={'NumberAreaSelector'} description={'NumberAreaSelector'} step={1} min={props.areasMin} max={props.areasMax} value={numberAreas} className='mx-4 my-4 w-full px-2' />
                }
            </div>
        </div>
    );
}

export default SelectionField;
