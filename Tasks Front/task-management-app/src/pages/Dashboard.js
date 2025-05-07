import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ inProgressTasks, completedTasks }) => {
  const navigate = useNavigate();

  const inProgress = Array.isArray(inProgressTasks) ? inProgressTasks : [];
  const completed = Array.isArray(completedTasks) ? completedTasks : [];

  const TaskSection = ({ title, icon, tasks, iconColor }) => (
    <Grid item xs={12} md={4}>
      <Paper sx={{ p: 2, height: '100%' }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          {React.cloneElement(icon, { sx: { mr: 1 }, color: iconColor })}
          {title} ({tasks.length})
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {tasks.length === 0 ? (
          <Typography variant="body2">Aucune tâche</Typography>
        ) : (
          <List>
            {tasks.slice(0, 5).map((task) => (
              <ListItem key={task._id} button onClick={() => navigate(`/tasks/${task._id}`)}>
                <ListItemIcon>
                  <AssignmentTurnedInIcon color={iconColor} />
                </ListItemIcon>
                <ListItemText
                  primary={task.title}
                  secondary={`Échéance: ${new Date(task.dueDate).toLocaleDateString()}`}
                />
              </ListItem>
            ))}
            {tasks.length > 5 && (
              <Button
                sx={{ mt: 1 }}
                size="small"
                onClick={() => navigate('/tasks')}
                aria-label={`Voir plus de tâches ${title.toLowerCase()}`}
              >
                Voir plus...
              </Button>
            )}
          </List>
        )}
      </Paper>
    </Grid>
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <TaskSection
          title="En cours"
          icon={<AssignmentIcon />}
          tasks={inProgress}
          iconColor="info"
        />
        <TaskSection
          title="Terminées"
          icon={<AssignmentTurnedInIcon />}
          tasks={completed}
          iconColor="success"
        />
      </Grid>
    </Container>
  );
};

export default Dashboard;
