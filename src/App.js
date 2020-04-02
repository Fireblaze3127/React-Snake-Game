import React from 'react';
import logo from './logo.svg';
import './App.css';
import ComponentA from './componentA'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ComponentA/>
        <ComponentA/>
      </header>
    </div>
  );
}

export default App;
