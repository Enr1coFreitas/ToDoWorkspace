import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export function useTask() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  useEffect(() => {
    if (token && !loading) {
      fetchTasks();
    }
  }, [filterStatus]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      let url = '/api/tasks';
      if (filterStatus !== 'all') {
        url += `?status=${filterStatus}`;
      }
      
      const response = await axios.get(url);
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Erro ao buscar tarefas.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const response = await axios.post('/api/tasks', taskData);
      setTasks([response.data, ...tasks]);
      return response.data;
    } catch (err) {
      setError('Erro ao adicionar tarefa.');
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, taskData);
      setTasks(tasks.map(task => task.id === id ? response.data : task));

      return response.data;
    } catch (err) {
      setError('Erro ao atualizar tarefa.');
      throw err;
    }
  };

  const toggleTaskCompletion = async (id, completed) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, { completed });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
      
      return response.data;
    } catch (err) {
      setError('Erro ao marcar tarefa.');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Erro ao excluir tarefa.');
      throw err;
    }
  };

  const value = {
    tasks,
    loading,
    error,
    filterStatus,
    setFilterStatus,
    fetchTasks,
    addTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}