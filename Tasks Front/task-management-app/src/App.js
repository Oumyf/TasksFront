// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';
import TaskDetail from './components/tasks/TaskDetail';
import TaskAssign from './components/tasks/TaskAssign';
import Header from './components/layout/Header';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/tasks" element={<PrivateRoute><TaskList /></PrivateRoute>} />
            <Route path="/tasks/create" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
            <Route path="/tasks/edit/:taskId" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
            <Route path="/tasks/:taskId" element={<PrivateRoute><TaskDetail /></PrivateRoute>} />
            <Route path="/tasks/assign/:taskId" element={<PrivateRoute><TaskAssign /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;