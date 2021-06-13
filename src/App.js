import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { ScoreEntry } from './components/ScoreEntry';
import { SignInView } from './components/SignInView';
import { ResultsView } from './components/ResultsView';
import { MatchPlay } from './components/MatchPlay';
import { SeasonSummary } from './components/SeasonSummary';

import './custom.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
          <BrowserRouter>
            <Route exact path='/' component={Home} />
            <Route path='/enter-scores' component={ScoreEntry} /> 
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} /> 
            <Route path='/sign-in' component={SignInView} /> 
            <Route path='/results' component={ResultsView} /> 
            <Route path='/match-play' component={MatchPlay} /> 
            <Route path='/season-summary' component={SeasonSummary} /> 
          </BrowserRouter>
        </Layout>
    );
  }
}