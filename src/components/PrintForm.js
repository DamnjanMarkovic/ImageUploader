import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from 'react'

const initialImageValues = {
    neededPaperHeight:0,
    neededPaperWidth:0,  
}

const initialSpecialImageValues = {

    allImagesPrintingPaperWidth:0,
    allImagesPrintingPaperHeight:0    
}

const finalPrintingValuesProps = {

    allImagesfinalPrintingValuesWidth:0,
    allImagesfinalPrintingValuesHeight:0,    
    dpiValueSet:0
}



export default function PrintForm(props) {   

    const [imageValues, setimageValues] = useState(initialImageValues)
    const [imageSpecialValues, setimageSpecialValues] = useState(initialSpecialImageValues)

    const [dpiValueInserted, setdpiValueInserted] = useState(0);
    const [paperWidthValueInserted, setpaperWidthValueInserted] = useState(0);
    const [finalResult, setfinalResult] = useState(0);
    

    const imgElement = React.useRef(null);


    
    useEffect(() => {
        setComplexValues();
    }, [setimageSpecialValues] )



    function setComplexValues() {

        let widthS = 0;
        let heightS = 0;

        for (let index = 0; index < props.images.length; index++) {
        (async () => {
                const img = new Image();
                img.src = props.images[index].imageSrc;
                await img.decode();
                const results = []
                results.push(img.width);
                results.push(img.height);
                return results
            })()       
            .then(res => {
                widthS = widthS + parseInt(res[0]);
                heightS = heightS + parseInt(res[1]);

                setimageSpecialValues(
                    {
                        allImagesPrintingPaperWidth: widthS, 
                        allImagesPrintingPaperHeight: heightS
                    })

            })

        }
    }



    const getTotalHeightValue = (image) => {
        console.log(`element.naturalWidth ${image.imageName}`)
        return 123;
    }


    function addImageProcess(src){
        return new Promise((resolve, reject) => {
          let img = new Image()
          img.onload = () => resolve(img.height)
          img.onerror = reject
          img.src = src
        })
      }

    const processImage = (image, imageOriginal) => {
        let allImagesPrintingPaperHeight = 0;
        let res = 0;
        addImageProcess(imageOriginal.imageSrc).then(res => {
            allImagesPrintingPaperHeight = res})

        setimageValues({            
            
            neededPaperHeight: Math.round(image.naturalHeight * 25.4 / 250 *100) / 100,
            neededPaperWidth: Math.round(image.naturalWidth * 25.4 / 250 * 100) / 100,
            
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setdpiValueInserted({
            resultdpiEntered: dpiValueInserted,
        })
        setpaperWidthValueInserted({
            resultPaperWidthEntered: paperWidthValueInserted
        })

        let totalWidth11 = Math.round(imageSpecialValues.allImagesPrintingPaperWidth* 25.4 / parseFloat(dpiValueInserted) *100) / 100;
        let totalHeight11 = Math.round(imageSpecialValues.allImagesPrintingPaperHeight * 25.4 / parseFloat(dpiValueInserted) *100) / 100;
        
        let paperNeededRectangleArea = Math.round((totalHeight11 * totalWidth11)/paperWidthValueInserted*100) / 100;

        setfinalResult({
            finalfinalresult: paperNeededRectangleArea
        })

    }


    return (
        <div className="printFormContainer">
            <div>
                <img src={props.printImage.imageSrc} className="card-img-top rounded-circle card-image printFormImage" 
                    ref={imgElement} onLoad={() => processImage(imgElement.current, props.printImage)} 
                />
            </div>
            
            <div className="printTextContainer">
                <h1 className="printFormImageName">{`Image ID: ${props.printImage.id}`}</h1>  
                <br/>              
                <h1 className="printFormImageName">{`Image name: ${props.printImage.imageName}`}</h1>
            </div>
            
            <div className="printDescriptionContainer">
                <div>
                    <h1 className="printFormImageInfo">{`Printing this image would require paper of the size`}</h1>
                    <h1 className="printFormImageInfo">{`${imageValues.neededPaperWidth} mm X ${imageValues.neededPaperHeight} mm`}</h1>
                    <br/>
                    <h1 className="printFormImageInfo">{`Printing all images would require paper of the size`}</h1>
                    <h1 className="printFormImageInfo">{`${imageSpecialValues.allImagesPrintingPaperWidth} mm X ${imageSpecialValues.allImagesPrintingPaperHeight} mm`}</h1>
                    <h1 className="printFormImageInfo">{`With the dpi od ${dpiValueInserted.resultdpiEntered} and printing paper width of 
                    ${paperWidthValueInserted.resultPaperWidthEntered}mm, it would take ${finalResult.finalfinalresult} mm long paper to print all the images`}</h1>



                </div>
            </div>




            <div className="input-dpi-form">
                <form onSubmit={handleSubmit}>
                    <label >Input dpi:<input 
                        type="text"
                        value={dpiValueInserted}
                        onChange={e => setdpiValueInserted(e.target.value)}
                        />
                    </label>
                    <label>Input papir width(in mm):<input
                        type="text"
                        value={paperWidthValueInserted}
                        onChange={e => setpaperWidthValueInserted(e.target.value)}
                        />
                    </label>

                <input type="submit" value="Submit" />
                </form>
            </div>
        
        </div>

    )
}
