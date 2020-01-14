import React, {Fragment} from 'react'
import spinner from './spinner-icon-gif-10.jpg'

const Spinner = ()=>{
    return(
<Fragment>
        <img src={spinner} alt='loading...' style={{width: '200px' , margin : 'auto', display: 'block'}}></img>
    </Fragment>
    )
}
export default Spinner