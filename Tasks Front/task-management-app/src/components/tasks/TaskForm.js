// src/components/tasks/TaskForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import taskService from '../../services/taskService';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const TaskForm = () => {
  const { taskId } = useParams();
  const isEditMode = Boolean(taskId);
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required('Le titre est requis'),
    description: Yup.string().required('La description est requise'),
    dueDate: Yup.date().required('La date d\'échéance est requise'),
    priority: Yup.string().required('La priorité est requise'),
    status: Yup.string().required('Le statut est requis')
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'MEDIUM',
      status: 'PENDING'
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEditMode) {
          await taskService.updateTask(taskId, values);
        } else {
          await taskService.createTask(values);
        }
        navigate('/tasks');
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue');
      }
    }
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchTask = async () => {
        try {
          const taskData = await taskService.getTaskById(taskId);
          
          // Format date for form input
          const formattedDueDate = new Date(taskData.dueDate).toISOString().split('T')[0];
          
          formik.setValues({
            title: taskData.title,
            description: taskData.description,
            dueDate: formattedDueDate,
            priority: taskData.priority,
            status: taskData.status
          });
        } catch (err) {
          setError('Impossible de charger la tâche');
        } finally {
          setLoading(false);
        }
      };

      fetchTask();
    }
  }, [isEditMode, taskId]);

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
            {isEditMode ? 'Modifier la tâche' : 'Créer une nouvelle tâche'}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Titre"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="dueDate"
                name="dueDate"
                label="Date d'échéance"
                type="date"
                value={formik.values.dueDate}
                onChange={formik.handleChange}
                error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                helperText={formik.touched.dueDate && formik.errors.dueDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="priority-label">Priorité</InputLabel>
                <Select
                  labelId="priority-label"
                  id="priority"
                  name="priority"
                  value={formik.values.priority}
                  label="Priorité"
                  onChange={formik.handleChange}
                  error={formik.touched.priority && Boolean(formik.errors.priority)}
                >
                  <MenuItem value="LOW">Faible</MenuItem>
                  <MenuItem value="MEDIUM">Moyenne</MenuItem>
                  <MenuItem value="HIGH">Élevée</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Statut</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  value={formik.values.status}
                  label="Statut"
                  onChange={formik.handleChange}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                >
                  <MenuItem value="PENDING">En attente</MenuItem>
                  <MenuItem value="IN_PROGRESS">En cours</MenuItem>
                  <MenuItem value="COMPLETED">Terminée</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{ mt: 2 }}
              >
                {isEditMode ? 'Mettre à jour' : 'Créer'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskForm;