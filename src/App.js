import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'

import axios from 'axios'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import notFound from './components/pages/notFound'


import GithubState from './context/github/GithubState'
import './App.css';

const App = () => {
  let githubClientId;
  let githubClientSecret;

  if(process.env.NODE_ENV !== 'production'){
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
  }else{
    githubClientId = process.env.GITHUB_CLIENT_ID
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET

  }

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);



  useEffect(async () => {
    //  function fetchData(){
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users?client_id=${githubClientId}&client_secret=${githubClientSecret}`)
    console.log(res.data)
    setUsers(res.data)
    setLoading(false)
    // }
    // fetchData();
  }, [])




  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }
  const showAlert = (msg, type) => {
    setAlert({ msg, type })

    setTimeout(() => {
      setAlert(null)
    }, 5000);
  }
  const searchUsers = async (text) => {
    console.log("qwedqwd", text)
    setLoading(true)


    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientSecret}&client_secret=${githubClientSecret}`)
    console.log(res.data.items)
    setUsers(res.data.items)
    setLoading(false)
  }
  const getUser = async (username) => {
    console.log("qwedqwd")
    setLoading(true)

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`)
    console.log(res.data)
    setUser(res.data)
    setLoading(false)
  }
  const getUserRepos = async (username) => {
    console.log("qwedqwd")
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
    console.log(res.data)
    setRepos(res.data)
    setLoading(false)
  }
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Github-Finder" icon='fab fa-github' />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading} />
              )}
              />
              <Route component={notFound}/>
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );

}

export default App; 
