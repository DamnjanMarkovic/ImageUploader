import { Link } from "react-router-dom"

const About = () => {
    return (
        <div>

            <div className='header-left' style={{padding:10, margin:20}}>
                <div className="header-left-link">
                    <Link to="/" className="aboutPageLink">Go Back
                    </Link>
                </div>
            </div>

            <h4 style={{alignContent:"space-around", position:"absolute", fontSize:80, padding:10, marginTop:120}}>
                Second Page Content

            </h4>


        </div>
    )
}

export default About