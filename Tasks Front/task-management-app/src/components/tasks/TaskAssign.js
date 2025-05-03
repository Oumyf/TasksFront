// src/components/tasks/TaskAssign.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import taskService from '../../services/taskService';
import userService from '../../services/userService';

import {
  Box,
  Button,
  Container,
  Typography,
  Alert,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';

const TaskAssign = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskData, usersData] = await Promise.all([
          taskService.getTaskById(taskId),
          userService.getAllUsers()
        ]);
        setTask(taskData);
        setUsers(usersData);
        setSelectedUser(taskData.assignedTo?._id || '');
      } catch (err) {
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [taskId]);

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await taskService.assignTask(taskId, selectedUser);
      navigate('/tasks');
    } catch (err) {
      setError('Erreur lors de l\'assignation de la tâche');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/tasks')}
            sx={{ mr: 2 }}
          >
            Retour
          </Button>
          <Typography variant="h5" component="h1">
            Assigner la tâche
          </Typography>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {task && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
          </Box>
        )}
        
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="user-label">Assigner à</InputLabel>
            <Select
              labelId="user-label"
              id="user-select"
              value={selectedUser}
              label="Assigner à"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Non assigné</em>
              </MenuItem>
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button
            type="submit"
            variant="contained"
            startIcon={<PersonAddIcon />}
          >
            Assigner
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskAssign;