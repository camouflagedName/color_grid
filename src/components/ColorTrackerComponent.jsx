import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';


const ColorTrackerComponent = ({ label, value, trackRef }) => {


    return (
        <Button id={`${label}-button`}  className='col mx-2' style={{backgroundColor: label}}>
            {label}
            <Badge id={`${label}-badge`}  bg="secondary" className='ms-1' ref={trackRef}>
                {value}
            </Badge>
        </Button>
    )
}

export default ColorTrackerComponent;