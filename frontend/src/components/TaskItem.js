import React, { useState } from 'react';
import { useTask } from '../contexts/TaskContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function TaskItem({ task }) {
  const { toggleTaskCompletion, updateTask, deleteTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [editedDueDate, setEditedDueDate] = useState(task.due_date || '');

  const handleCheckboxChange = () => {
    toggleTaskCompletion(task.id, !task.completed);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
    setEditedDueDate(task.due_date || '');
  };

  const handleSave = async () => {
    try {
      await updateTask(task.id, {
        title: editedTitle,
        description: editedDescription,
        due_date: editedDueDate || null
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR });
  };

  if (isEditing) {
    return (
      <div className={`task-item card mb-3 ${task.completed ? 'bg-light' : ''}`}>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor={`title-${task.id}`} className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id={`title-${task.id}`}
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor={`description-${task.id}`} className="form-label">Descrição</label>
            <textarea
              className="form-control"
              id={`description-${task.id}`}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows="3"
            ></textarea>
          </div>
          
          <div className="mb-3">
            <label htmlFor={`due-date-${task.id}`} className="form-label">Data de Vencimento</label>
            <input
              type="date"
              className="form-control"
              id={`due-date-${task.id}`}
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
            />
          </div>
          
          <div className="d-flex justify-content-end">
            <button onClick={handleCancel} className="btn btn-outline-dark me-2">Cancelar</button>
            <button onClick={handleSave} className="btn btn-dark">Salvar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item card mb-3 ${task.completed ? 'bg-light' : ''}`}>
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={task.completed}
              onChange={handleCheckboxChange}
              id={`task-${task.id}`}
            />
            <label className={`form-check-label ${task.completed ? 'text-decoration-line-through text-muted' : 'fw-bold'}`} htmlFor={`task-${task.id}`}>
              {task.title}
            </label>
          </div>
        </div>
        
        {task.description && (
          <p className="card-text text-muted mb-2">{task.description}</p>
        )}
        
        {task.due_date && (
          <div className="mb-2 small">
            <span className="text-muted">Vencimento: {formatDate(task.due_date)}</span>
          </div>
        )}
        
        <div className="d-flex justify-content-end">
          <button onClick={handleEdit} className="btn btn-sm btn-outline-dark me-2">Editar</button>
          <button onClick={handleDelete} className="btn btn-sm btn-outline-danger">Excluir</button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;