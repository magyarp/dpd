import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Menu from './components/menu';
import Form from './components/form';
import DataBrowser from './components/data-browser';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/">
            <Redirect to="/form" />
          </Route>
          <Route path="/form" component={Form} />
          <Route path="/browse-data" component={DataBrowser} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
