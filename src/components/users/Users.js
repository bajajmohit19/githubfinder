import React, {useContext, useEffect} from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/spinner'
import propTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext'


const Users =({users ,loading})=>{
    const githubContext = useContext(GithubContext) 
    console.log("aaaaaaaaaaaaaa", githubContext)
    // const {loading, users} = githubContext
        if(loading){
            return <Spinner/>
        }else {

            console.log("12121",users)
    
        return (
            <div style={userStyle}>
                {users.map(user => 
                    <UserItem key={user.id} user={user}/>
                )}
            </div>
        );
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: '1rem'
}
Users.propTypes = {
    users: propTypes.array.isRequired,
    loading: propTypes.bool.isRequired
}

export default Users;
