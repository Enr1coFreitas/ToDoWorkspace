import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import DailyGif from '../components/DailyGif';
import axios from 'axios';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [quote, setQuote] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await axios.get('/api/quote');
        setQuote(response.data.quote);
      } catch (error) {
        console.error('Erro ao buscar citação:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getQuote();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/dashboard">
            ToDoWorkspace
          </a>
          <div className="navbar-text ms-auto">
            <span className="me-3">Olá, {currentUser.name}</span>
            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
              Sair
            </button>
          </div>
        </div>
      </nav>

      <div className="container my-4">
        {!loading && quote && (
          <div className="alert alert-info">
            <i className="bi bi-quote me-2"></i>
            {quote}
            <DailyGif />
          </div>
        )}
        
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h1 className="mb-4 text-center">Lista de tarefas</h1>
            
            <AddTaskForm />
            <TaskFilter />
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;