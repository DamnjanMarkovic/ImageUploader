import { useState, useEffect } from 'react'

const defaultImageSrc = '/imageDefault.jpg'

const initialFieldValues = {
    id: 0,
    imageName: '',
    imageSrc: defaultImageSrc,
    imageFile: null
}

export default function Image( props) {

    const { addOrEdit, recordForEdit } = props

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        if (recordForEdit != null)
            setValues(recordForEdit);
    }, [recordForEdit])



    const showPreview = e => {

        if (e.target.files && e.target.files[0]) {

            let imageFile = Array.from(e.target.files)
                const reader = new FileReader();
                reader.onload = x => {
                    setValues({ 
                        ...values,
                        imageFile,
                        imageSrc: x.target.result})
                }
                reader.readAsDataURL(imageFile[0])
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }

    const validate = props => {
        let temp = {}
        temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x == true)        
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        document.id('image-uploader').value = null;
        setErrors({})
    }

    const handleFormSubmit = e => {

        e.preventDefault()
        if (validate()) {

            const formData = new FormData()
            values.imageFile.forEach(element => {
                formData.append('iFormFiles', element)
            });
            addOrEdit(formData, resetForm)
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')

    return (
        <>
            <div className="container text-center">
            </div>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="inputForm">

                    <img src={values.imageSrc} className="card-image inputFormImage" />
                        
                        <div className="form-group">
                            <input type="file" accept="image/*" id="inputImageForm" multiple="multiple"
                            className={"form-input-fileName" + applyErrorClass('imageSrc')}
                                onChange={showPreview}  />
                        </div>
                        
                        <div className="form-group text-center">
                            <button type="submit" className="btnSubmit" >Submit Image</button>
                        </div>
                   
                </div>
            </form>
        </>
    )
}
