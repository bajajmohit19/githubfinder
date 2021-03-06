import React, {  useState , useContext} from 'react'
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext'
import githubReducer from '../../context/github/githubReducer'


const Search = ({ clearUsers, showClear, setAlert, searchUsers})=> {
    // const gitHubContext = useContext(GithubContext)
    const [text, setText] = useState(' ');
    const onChange = (e) => {
        console.log(e.target.value)
        setText(e.target.value )
    }
   const onSubmit = (e)=>{
        e.preventDefault()
        console.log("asdcdwfcwea",e.target.value, text)
        if(text === ' '){
            setAlert('Please type something', 'light')
        } else{

            searchUsers(text)
            setText(' ')
        }
        console.log(text) 
           
    }
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        type='text'
                        name='text'
                        placeholder='Search Users...'
                        value={text}
                        onChange={onChange}
                    />
                    <input
                        type='submit'
                        value='search'
                        className='btn btn-dark btn-block' />
                </form>
                {showClear && <button 
                className='btn btn-light btn-block' 
                onClick={clearUsers}>Clear</button>}
                
            </div>
        )
}
Search.propTypes = {
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
};
export default Search