import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { paths } from './constants';
import Home from './components/pages/Home/Home'
import NotFound from './components/pages/NotFound/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={paths.home}>
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch> 
    </BrowserRouter>
  );
}

export default App;
