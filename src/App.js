import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/Main/main';
import PropertyDetailsPage from './components/PropertyDetails/propertyDetails';
import AddPropertyModal from './components/AddProperty/addProperty';

const NoMatchRoute = () => <div>404 Page</div>;
function App() {
  return (
   <Router>
      <Switch>
        <Route path="/" exact >
          <Main/>
        </Route>
        <Route path="/property/:id">
          <PropertyDetailsPage/>
        </Route>
        <Route path="/addProperty">
          <AddPropertyModal/>
        </Route>
        <Route>
          <NoMatchRoute/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
