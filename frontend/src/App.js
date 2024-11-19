import React from 'react';
import './index.css';
import UserList from './components/UserList';
import './App.css'
const App = () => {
  return (
    <div className="App">
      <h1>User Management Application</h1>
      <UserList />
    </div>
  );
};

export default App;
