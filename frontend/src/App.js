import './App.css'
import React, { useState, useEffect } from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import authActions from './redux/actions/authActions'

import Home from './pages/Home'
import Cities from './pages/Cities'
import NotFound from './pages/NotFound'
import InfoCity from './pages/InfoCity'

import Header from './components/Header'
import Footer from './components/Footer'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'



const App = (props) => {
  
  useEffect( () => {
    if(localStorage.getItem('token')) {
      props.logInUser(localStorage.getItem('token'))
    }
  }, [])

  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/cities'  component={Cities} />
        <Route path='/info-city/:id' component={InfoCity} />
        {!props.token && <Route path='/signin' component={SignIn} />}
        {!props.token && <Route path='/signup' component={SignUp} />}
        <Route path='/notfound' component={NotFound} />
        <Redirect to='/'/>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
      token: state.authReducer.token

  }
}

const mapDispatchToProps = {
  logInUser: authActions.loginLocalStorage
}
  
export default connect(mapStateToProps, mapDispatchToProps)(App)