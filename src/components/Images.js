import { useState, useEffect } from 'react'
import Image from './Image'
import Header from './Header'
import axios from "axios";
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap"

import PrintForm from './PrintForm';



export default function Images() {

    const [images, setImages] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [imageExists, setimageExists] = useState(true);
    const [showAddImage, setShowAddImage] = useState(false)
    const [progress, setProgress] = useState()
    const [printImage, setprintImage] = useState(null)
    const [printAllImages, setprintAllImages] = useState(null)
    const [showPrintForm, setshowPrintForm] = useState(false)

    useEffect(() => {
        refreshImages();
    }, [])

    const imagesAPI = (url = 'https://localhost:44397/api/Image/') => {
        return {
            fetchAll: () => axios.get(url),
            create: formData => axios.post(url, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
                onUploadProgress: data => {
                  setProgress(Math.round((100 * data.loaded) / data.total))
                },
              }),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    function refreshImages() {
        imagesAPI().fetchAll()        
            .then(res => {
                setImages(res.data)                
            })
            .catch(err => console.log(err))
    }

    const addOrEdit = (formData, onSuccess) => {

            imagesAPI().create(formData)
                .then(res => {
                    refreshImages();
                    //onSuccess(); 
                    if (res.data.includes("already exists!")) {
                        alert(res.data); 
                    }
                    
                })
                .catch(err => console.log(err.value))
    }


    const showRecordDetails = data => {
        setRecordForEdit(data)
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
            imagesAPI().delete(id)
                .then(res => refreshImages())
                .catch(err => console.log(err))
    }



    const print = (e, image) => {
        e.stopPropagation();
        setprintImage(image);
        setshowPrintForm(!showPrintForm);
    }



    const imageCard = data => (
        <>
        <div className="card cardContainer" onClick={() => { showRecordDetails(data) }}>
            <div className="btn-print-container">
                <button className="btn print-button" onClick={e => print(e, data) }>
                    <i className="fas fa-print fa-2x printSign" ></i>
                </button>
            </div>
            <img src={data.imageSrc} className="card-img-top rounded-circle card-image" />
            
            <div className="card-body">

                <h1 className="imageName">{(data.imageName).substring(0, (data.imageName).length-4)}</h1>
                
                <button className="btn btn-light delete-button" onClick={e => onDelete(e, parseInt(data.id))}>
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
        </>
    )


    return (
        <div className="row">
            <Header onAdd={() => setShowAddImage(!showAddImage)} showAdd = {showAddImage} className="header" />
            <div >
                <div >
                {showAddImage &&  
                <Image imageExists = {true}
                    addOrEdit={addOrEdit}
                    recordForEdit={recordForEdit}
                />}
                </div>
                <div visuallyhidden='true'>
                    {progress && progress < '100' && <ProgressBar  animated='true' now={progress} label={`${progress}%`}  />}
                </div>
                <div className="col-md-8">
                    
                <table>
                    <tbody>
                        <div className="printFormInfo">
                            {showPrintForm && <PrintForm printImage={printImage} images={images}  />}
                        </div>
                        <div>
                        {
                            [...Array(Math.ceil(images.length / 6))].map((e, i) =>
                                <tr key={i}>
                                    <td>{imageCard(images[6 * i])}</td>
                                    <td>{images[6 * i + 1] ? imageCard(images[6 * i + 1]) : null}</td>
                                    <td>{images[6 * i + 2] ? imageCard(images[6 * i + 2]) : null}</td>
                                    <td>{images[6 * i + 3] ? imageCard(images[6 * i + 3]) : null}</td>
                                    <td>{images[6 * i + 4] ? imageCard(images[6 * i + 4]) : null}</td>
                                    <td>{images[6 * i + 5] ? imageCard(images[6 * i + 5]) : null}</td>
                                </tr>
                                
                            )
                        }
                        </div>

                    </tbody>
                </table>
                </div>

            </div>
            
        </div>
    )

                    
}
