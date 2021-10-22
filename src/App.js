import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';
import Home1 from './components/Home1'
import Home from './components/Home';
function App() {
  return (
    
    <>
      <Router>
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/registration" exact component={Registration}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/todo" exact component={Home1}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;