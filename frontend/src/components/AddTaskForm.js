import React, { useState } from 'react';
import { useTask } from '../contexts/TaskContext';

function AddTaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');
  const { addTask } = useTask();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('O título da tarefa é obrigatório.');
      return;
    }
    
    try {
      setError('');
      await addTask({
        title,
        description: description.trim() ? description : null,
        due_date: dueDate || null
      });
      
      setTitle('');
      setDescription('');
      setDueDate('');
      setIsAdding(false);
    } catch (err) {
      setError('Erro ao adicionar tarefa. Tente novamente.');
      console.error('Error adding task:', err);
    }
  };

  if (!isAdding) {
    return (
      <div className="d-grid mb-4">
        <button 
          className="btn btn-dark"
          onClick={() => setIsAdding(true)}
        >
          <i className="bi bi-plus-lg me-2"></i> Nova Tarefa
        </button>
      </div>
    );
  }

  return (
    <div className="add-task-form card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Nova Tarefa</h5>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="task-title" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nome da tarefa"
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="task-description" className="form-label">Descrição (opcional)</label>
            <textarea
              className="form-control"
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes da tarefa"
              rows="3"
            ></textarea>
          </div>
          
          <div className="mb-3">
            <label htmlFor="task-due-date" className="form-label">Data de Vencimento (opcional)</label>
            <input
              type="date"
              className="form-control"
              id="task-due-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={() => {
                setIsAdding(false);
                setError('');
                setTitle('');
                setDescription('');
                setDueDate('');
              }}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-dark">Adicionar Tarefa</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskForm;