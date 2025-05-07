// Imports toujours les mêmes...
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import taskService from '../../services/taskService';
import {
  Box, Button, Container, TextField, Typography, Alert,
  Paper, Grid, FormControl, InputLabel, Select, MenuItem,
  CircularProgress, FormHelperText
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
    description: Yup.string().max(500),
    dueDate: Yup.date().required("La date de début est requise"),
    endDate: Yup.date().min(Yup.ref('dueDate'), 'La date de fin doit être postérieure à la date de début'),
    priority: Yup.string().required('La priorité est requise'),
    status: Yup.string().required('Le statut est requis'),
    progression: Yup.number().min(0).max(100),
    couleur: Yup.string().required('La couleur est requise')
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      endDate: '',
      priority: 'MEDIUM',
      status: 'PENDING',
      progression: 0,
      couleur: '#1976d2', // couleur par défaut (bleu)
      parentId: '',
      taskGroupId: '',
      createdBy: '' // à auto-remplir si tu as un user connecté
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const mappedValues = {
          name: values.title,
          description: values.description,
          dateDebut: values.dueDate,
          dateFin: values.endDate || undefined,
          priorite: values.priority.toLowerCase(),
          status: values.status.toLowerCase(),
          progression: values.progression,
          couleur: values.couleur,
          parentId: values.parentId || null,
          taskGroupId: values.taskGroupId || null,
          createdBy: values.createdBy || null
        };

        if (isEditMode) {
          await taskService.updateTask(taskId, mappedValues);
        } else {
          await taskService.createTask(mappedValues);
        }

        navigate('/tasks');
      } catch (err) {
        console.error('Erreur API:', err);
        setError(err.response?.data?.message || 'Une erreur est survenue');
      }
    }
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchTask = async () => {
        try {
          const taskData = await taskService.getTaskById(taskId);
          formik.setValues({
            title: taskData.name,
            description: taskData.description || '',
            dueDate: taskData.dateDebut?.split('T')[0] || '',
            endDate: taskData.dateFin?.split('T')[0] || '',
            priority: taskData.priorite?.toUpperCase() || 'MEDIUM',
            status: taskData.status?.toUpperCase() || 'PENDING',
            progression: taskData.progression || 0,
            couleur: taskData.couleur || '#1976d2',
            parentId: taskData.parentId || '',
            taskGroupId: taskData.taskGroupId || '',
            createdBy: taskData.createdBy || ''
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
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/tasks')} sx={{ mr: 2 }}>
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
              <TextField fullWidth id="title" name="title" label="Titre"
                value={formik.values.title} onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title} />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth id="description" name="description" label="Description"
                multiline rows={4} value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description} />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth id="dueDate" name="dueDate" label="Date de début" type="date"
                value={formik.values.dueDate} onChange={formik.handleChange}
                error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                helperText={formik.touched.dueDate && formik.errors.dueDate}
                InputLabelProps={{ shrink: true }} />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth id="endDate" name="endDate" label="Date de fin" type="date"
                value={formik.values.endDate} onChange={formik.handleChange}
                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                helperText={formik.touched.endDate && formik.errors.endDate}
                InputLabelProps={{ shrink: true }} />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth error={formik.touched.priority && Boolean(formik.errors.priority)}>
                <InputLabel id="priority-label">Priorité</InputLabel>
                <Select labelId="priority-label" id="priority" name="priority"
                  value={formik.values.priority} label="Priorité" onChange={formik.handleChange}>
                  <MenuItem value="LOW">Faible</MenuItem>
                  <MenuItem value="MEDIUM">Moyenne</MenuItem>
                  <MenuItem value="HIGH">Élevée</MenuItem>
                </Select>
                {formik.touched.priority && <FormHelperText>{formik.errors.priority}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
                <InputLabel id="status-label">Statut</InputLabel>
                <Select labelId="status-label" id="status" name="status"
                  value={formik.values.status} label="Statut" onChange={formik.handleChange}>
                  <MenuItem value="PENDING">En attente</MenuItem>
                  <MenuItem value="IN_PROGRESS">En cours</MenuItem>
                  <MenuItem value="COMPLETED">Terminée</MenuItem>
                </Select>
                {formik.touched.status && <FormHelperText>{formik.errors.status}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth id="progression" name="progression" label="Progression (%)"
                type="number" inputProps={{ min: 0, max: 100 }}
                value={formik.values.progression} onChange={formik.handleChange}
                error={formik.touched.progression && Boolean(formik.errors.progression)}
                helperText={formik.touched.progression && formik.errors.progression} />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth id="couleur" name="couleur" label="Couleur"
                type="color" value={formik.values.couleur}
                onChange={formik.handleChange}
                error={formik.touched.couleur && Boolean(formik.errors.couleur)}
                helperText={formik.touched.couleur && formik.errors.couleur} />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth id="parentId" name="parentId" label="ID de la tâche parente"
                value={formik.values.parentId} onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth id="taskGroupId" name="taskGroupId" label="ID du groupe"
                value={formik.values.taskGroupId} onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth id="createdBy" name="createdBy" label="Créé par (ID)"
                value={formik.values.createdBy} onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" startIcon={<SaveIcon />} sx={{ mt: 2 }}>
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
 