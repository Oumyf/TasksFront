// src/components/tasks/TaskList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import taskService from '../../services/taskService';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const getStatusColor = (status) => {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'IN_PROGRESS':
      return 'info';
    case 'COMPLETED':
      return 'success';
    default:
      return 'default';
  }
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const tasksData = await taskService.getAllTasks();
      setTasks(tasksData);
      setError('');
    } catch (err) {
      console.error('Erreur lors de la récupération des tâches:', err);
      setError('Impossible de récupérer les tâches. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = () => {
    navigate('/tasks/create');
  };

  const handleEditTask = (taskId) => {
    navigate(`/tasks/edit/${taskId}`);
  };

  const handleViewTask = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleDeleteDialog = (task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    
    try {
      await taskService.deleteTask(taskToDelete._id);
      setTasks(tasks.filter(task => task._id !== taskToDelete._id));
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
    } catch (err) {
      console.error('Erreur lors de la suppression de la tâche:', err);
      setError('Impossible de supprimer la tâche. Veuillez réessayer plus tard.');
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const updatedTask = await taskService.completeTask(taskId);
      setTasks(tasks.map(task => 
        task._id === taskId ? updatedTask : task
      ));
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la tâche:', err);
      setError('Impossible de marquer la tâche comme terminée. Veuillez réessayer plus tard.');
    }
  };

  const handleAssignTask = (taskId) => {
    navigate(`/tasks/assign/${taskId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Liste des tâches
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateTask}
        >
          Nouvelle tâche
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {tasks.length === 0 ? (
        <Alert severity="info">Aucune tâche disponible. Créez-en une nouvelle !</Alert>
      ) : (
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {task.title}
                  </Typography>
                  <Chip 
                    label={task.status} 
                    color={getStatusColor(task.status)} 
                    size="small" 
                    sx={{ mb: 2 }} 
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {task.description.length > 100 
                      ? `${task.description.substring(0, 100)}...` 
                      : task.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Date d'échéance:</strong> {new Date(task.dueDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Assigné à:</strong> {task.assignedTo 
                      ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}` 
                      : 'Non assigné'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleViewTask(task._id)}>
                    Voir
                  </Button>
                  <IconButton 
                    size="small" 
                    color="primary" 
                    onClick={() => handleEditTask(task._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error" 
                    onClick={() => handleDeleteDialog(task)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {task.status !== 'COMPLETED' && (
                    <>
                      <IconButton 
                        size="small" 
                        color="success" 
                        onClick={() => handleCompleteTask(task._id)}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="info" 
                        onClick={() => handleAssignTask(task._id)}
                      >
                        <AssignmentIcon />
                      </IconButton>
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleDeleteTask} color="error" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;