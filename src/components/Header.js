import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {

    const location = useLocation()

    return (

            <div className='header-complete'>

         
                <div className='header-left'>
                    <div className="header-left-link">
                        <Link to="/about" className="aboutPageLink">About App Page</Link>
                    </div>
                    
                </div>

                <div className="header-center">
                    <h1 className="display-4">Image Gallery</h1>
                </div>

                <div className='header-right'>
                    {location.pathname === '/' && (<Button color={showAdd ? 'red' : 'yellowgreen'} text={showAdd ? 'Close Form' : 'Add Image'} onClick={onAdd}/>)}
                </div>
            
            </div>

    )
}





export default Header