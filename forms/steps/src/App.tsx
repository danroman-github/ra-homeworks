import React, { useState } from 'react';
import { TrainingForm } from './components/TrainingForm';
import { TrainingTable } from './components/TrainingTable';
import { Training } from './types';
import { formatDisplayDate } from './utils/dateUtils';
import './App.css';

const App: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([
    {
      date: '2019-07-20',
      displayDate: '20.07.2019',
      distance: 5.7
    },
    {
      date: '2019-07-19',
      displayDate: '19.07.2019',
      distance: 14.2
    },
    {
      date: '2019-07-18',
      displayDate: '18.07.2019',
      distance: 3.4
    }
  ]);

  const [editDate, setEditDate] = useState<string | null>(null);
  const [editDistance, setEditDistance] = useState<number | null>(null);

  const handleSubmit = (date: string, distance: number) => {
    if (editDate) {
      const updatedTrainings = trainings.map(training => {
        if (training.date === editDate) {
          return {
            date,
            displayDate: formatDisplayDate(date),
            distance
          };
        }
        return training;
      });

      const sortedTrainings = [...updatedTrainings].sort((a, b) =>
        b.date.localeCompare(a.date)
      );

      setTrainings(sortedTrainings);
      setEditDate(null);
      setEditDistance(null);
    } else {
      const existingIndex = trainings.findIndex(t => t.date === date);

      if (existingIndex !== -1) {
        const updatedTrainings = [...trainings];
        updatedTrainings[existingIndex] = {
          ...updatedTrainings[existingIndex],
          distance: updatedTrainings[existingIndex].distance + distance
        };

        const sortedTrainings = [...updatedTrainings].sort((a, b) =>
          b.date.localeCompare(a.date)
        );

        setTrainings(sortedTrainings);
      } else {
        const newTraining: Training = {
          date,
          displayDate: formatDisplayDate(date),
          distance
        };

        const newTrainings = [...trainings, newTraining].sort((a, b) =>
          b.date.localeCompare(a.date)
        );

        setTrainings(newTrainings);
      }
    }
  };

  const handleDelete = (date: string) => {
    const updatedTrainings = trainings.filter(training => training.date !== date);
    setTrainings(updatedTrainings);

    if (editDate === date) {
      setEditDate(null);
      setEditDistance(null);
    }
  };

  const handleEdit = (training: Training) => {
    setEditDate(training.date);
    setEditDistance(training.distance);

    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearEdit = () => {
    setEditDate(null);
    setEditDistance(null);
  };

  return (
    <div className="container">
      <div className="form-container">
        <TrainingForm
          onSubmit={handleSubmit}
          editDate={editDate}
          editDistance={editDistance}
          onClearEdit={handleClearEdit}
        />
      </div>

      <div className="data-table">
        <div className="table-header">
          <div className="col-date">Дата (ДД.ММ.ГГГГ)</div>
          <div className="col-distance">Пройдено км</div>
          <div className="col-actions">Действия</div>
        </div>

        <TrainingTable
          trainings={trainings}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default App;