import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import CaverJavaPage from './pages/caver-java';
import CaverJsPage from './pages/caver-js';
import RedocPage from './pages/redoc'

import docs from './docs.json';

const App = () => {
  const sitePrefix = process.env.REACT_APP_URL_PREFIX
  return (
    <BrowserRouter basename={sitePrefix}>
      <Switch>
        <Redirect from='/' to={docs[0].targetPath} exact />
        {docs.map((d,i)=> {
          return (
            <Route exact key={`route-${i}`} path={d.targetPath} render={(props)=>{
              return (<RedocPage {...props} spec={d.filepath} title={d.title} />)}
            } />
          ) 
        })}
        <Route exact key={`route-caver-js`} path='/en/sdk/js/latest' render={(props)=>{
          return (<CaverJsPage {...props} />)}
        } />
        <Redirect from='/ko/sdk/js/latest' to='/en/sdk/js/latest' exact />
        <Redirect from='/ko/sdk/js' to='/en/sdk/js/latest' exact />
        <Redirect from='/en/sdk/js' to='/en/sdk/js/latest' exact />
        <Route exact key={`route-caver-java`} path='/en/sdk/java/:version' render={(props)=>{
          return (<CaverJavaPage {...props} />)}
        } />
        <Redirect from='/ko/sdk/java' to='/en/sdk/java/latest' exact />
        <Redirect from='/en/sdk/java' to='/en/sdk/java/latest' exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
