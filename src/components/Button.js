import PropTypes from 'prop-types'

const Button = ({color, text, onClick}) => {

    return (
    <button onClick={onClick}
            style={{backgroundColor: color, margin: 10}}
            className='btn'>
        {text}
    </button>
    )
}


export default Button