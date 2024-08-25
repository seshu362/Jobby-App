import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Jobs from './components/Jobs'
import DetailsJobItem from './components/DetailsJobItem'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />

        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/jobs" component={Jobs} />
        <ProtectedRoute exact path="/jobs/:id" component={DetailsJobItem} />
        <Route component={NotFound}/>
      </Switch>
    )
  }
}
export default App
