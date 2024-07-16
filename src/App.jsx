import React from 'react';
import './App.css';
import { StudentProvider } from './component/StudentContext';
import StudentApp from './component/StudentApp'; 

const App = () => {
  return (
    <div className="App">
      <StudentProvider>
        <StudentApp />
      </StudentProvider>
    </div>
  );
}

export default App;
