// src/components/tasks/TaskDetail.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import taskService from '../../services/taskService';
import {
  Box,
  Button,
  Container,
  Typography,
  Alert,
  Paper,
  Chip,
  Grid,
  Divider,
  Avatar,
  CircularProgress
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Assignment as AssignmentIcon,
  AccessTime as AccessTimeIcon,
  Today as TodayIcon,
  Flag as FlagIcon
} from '@mui/icons-material';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'HIGH':
      return 'error';
    case 'MEDIUM':
      return 'warning';
    case 'LOW':
      return 'success';
    default:
      return 'default';
  }
};

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

const TaskDetail = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await taskService.getTaskById(taskId);
        setTask(taskData);
      } catch (err) {
        setError('Erreur lors du chargement de la tâche');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleComplete = async () => {
    try {
      const updatedTask = await taskService.completeTask(taskId);
      setTask(updatedTask);
    } catch (err) {
      setError('Erreur lors de la mise à jour du statut');
    }
  };

  const handleEdit = () => {
    navigate(`/tasks/edit/${taskId}`);
  };

  const handleDelete = async () => {
    try {
      await taskService.deleteTask(taskId);
      navigate('/tasks');
    } catch (err) {
      setError('Erreur lors de la suppression de la tâche');
    }
  };

  const handleAssign = () => {
    navigate(`/tasks/assign/${taskId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!task) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">Tâche non trouvée</Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/tasks')} sx={{ mt: 2 }}>
          Retour à la liste
        </Button>
      </Container>
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
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
            Détails de la tâche
          </Typography>
          <Box>
            <Button
              startIcon={<EditIcon />}
              onClick={handleEdit}
              sx={{ mr: 1 }}
            >
              Modifier
            </Button>
            <Button
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </Box>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Typography variant="h4" gutterBottom>{task.title}</Typography>
        
        <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip 
            label={task.status} 
            color={getStatusColor(task.status)} 
            icon={<CheckCircleIcon />}
          />
          <Chip 
            label={task.priority} 
            color={getPriorityColor(task.priority)} 
            icon={<FlagIcon />}
          />
          <Chip 
            label={new Date(task.dueDate).toLocaleDateString()} 
            icon={<TodayIcon />}
          />
          <Chip 
            label={`Créée le ${new Date(task.createdAt).toLocaleDateString()}`} 
            icon={<AccessTimeIcon />}
          />
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="h6" gutterBottom>Description</Typography>
        <Typography variant="body1" paragraph>
          {task.description}
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>Assignée à</Typography>
            {task.assignedTo ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ mr: 2 }}>
                  {task.assignedTo.fullName.charAt(0)}
                </Avatar>
                <Typography>
                  {task.assignedTo.fullName} 
                </Typography>
              </Box>
            ) : (
              <Typography>Non assignée</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AssignmentIcon />}
              onClick={handleAssign}
              sx={{ mr: 2 }}
            >
              {task.assignedTo ? 'Réassigner' : 'Assigner'}
            </Button>
            
            {task.status !== 'COMPLETED' && (
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={handleComplete}
              >
                Marquer comme terminée
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TaskDetail;