import React from 'react';
import { useTask } from '../contexts/TaskContext';

function TaskFilter() {
  const { filterStatus, setFilterStatus } = useTask();

  return (
    <div className="task-filter mb-4">
      <div className="btn-group w-100" role="group">
        <input
          type="radio"
          className="btn-check"
          name="filter"
          id="all"
          checked={filterStatus === 'all'}
          onChange={() => setFilterStatus('all')}
        />
        <label className="btn btn-outline-dark" htmlFor="all">Todas</label>

        <input
          type="radio"
          className="btn-check"
          name="filter"
          id="pending"
          checked={filterStatus === 'pending'}
          onChange={() => setFilterStatus('pending')}
        />
        <label className="btn btn-outline-dark" htmlFor="pending">Pendentes</label>

        <input
          type="radio"
          className="btn-check"
          name="filter"
          id="completed"
          checked={filterStatus === 'completed'}
          onChange={() => setFilterStatus('completed')}
        />
        <label className="btn btn-outline-dark" htmlFor="completed">Concluídas</label>
      </div>
    </div>
  );
}

export default TaskFilter;