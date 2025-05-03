import React from 'react';
import { Container, Grid, Paper, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ inProgressTasks, completedTasks }) => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* En cours */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <AssignmentIcon sx={{ mr: 1 }} color="info" />
              En cours ({inProgressTasks.length})
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {inProgressTasks.length === 0 ? (
              <Typography variant="body2">Aucune tâche en cours</Typography>
            ) : (
              <List>
                {inProgressTasks.slice(0, 5).map(task => (
                  <ListItem
                    key={task._id}
                    button
                    onClick={() => navigate(`/tasks/${task._id}`)}
                  >
                    <ListItemIcon>
                      <AssignmentTurnedInIcon color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary={task.title}
                      secondary={`Échéance: ${new Date(task.dueDate).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))}
                {inProgressTasks.length > 5 && (
                  <Button
                    sx={{ mt: 1 }}
                    size="small"
                    onClick={() => navigate('/tasks')}
                  >
                    Voir plus...
                  </Button>
                )}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Terminées */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <AssignmentTurnedInIcon sx={{ mr: 1 }} color="success" />
              Terminées ({completedTasks.length})
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {completedTasks.length === 0 ? (
              <Typography variant="body2">Aucune tâche terminée</Typography>
            ) : (
              <List>
                {completedTasks.slice(0, 5).map(task => (
                  <ListItem
                    key={task._id}
                    button
                    onClick={() => navigate(`/tasks/${task._id}`)}
                  >
                    <ListItemIcon>
                      <AssignmentTurnedInIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary={task.title}
                      secondary={`Échéance: ${new Date(task.dueDate).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))}
                {completedTasks.length > 5 && (
                  <Button
                    sx={{ mt: 1 }}
                    size="small"
                    onClick={() => navigate('/tasks')}
                  >
                    Voir plus...
                  </Button>
                )}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
