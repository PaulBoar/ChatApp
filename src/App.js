
import { Fragment } from 'react';
import './App.css';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Form from './components/Main/Form'

function App() {
  return (
    <div className='app'>
    <Header /> <br/>
    <Main />
    <Form />
    </div>
  );
}

export default App;
