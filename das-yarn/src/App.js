import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ROUTES } from './utils/constants'
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import submissionReducer from "./reducers/submissionReducer";
import newSubmissionComponent from "./pages/newSubmission/newSubmissionForm";
import resultsComponent from "./pages/results/results";
import React from "react";


const rootReducer = combineReducers({ submission: submissionReducer });

function App() {
  return (
    <Provider store={createStore(rootReducer)}>
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTES.RESULTS} component={resultsComponent} />
          <Route exact path={ROUTES.SUBMIT} component={newSubmissionComponent} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
