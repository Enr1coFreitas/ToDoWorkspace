import React from 'react';
import { useTask } from '../contexts/TaskContext';
import TaskItem from './TaskItem';

function TaskList() {
  const { tasks, loading, error } = useTask();

  if (loading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (tasks.length === 0) {
    return <div className="text-center text-muted my-4">Nenhuma tarefa encontrada.</div>;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;