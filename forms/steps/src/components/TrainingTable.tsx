import React from 'react';
import { Training } from '../types';

interface TrainingTableProps {
    trainings: Training[];
    onDelete: (date: string) => void;
    onEdit: (training: Training) => void;
}

export const TrainingTable: React.FC<TrainingTableProps> = ({
    trainings,
    onDelete,
    onEdit
}) => {
    if (trainings.length === 0) {
        return (
            <div className="table-body">
                <div className="empty-state">Нет данных о тренировках</div>
            </div>
        );
    }

    return (
        <div className="table-body">
            {trainings.map((training) => (
                <div className="table-row" key={training.date}>
                    <div className="col-date">{training.displayDate}</div>
                    <div className="col-distance">{training.distance}</div>
                    <div className="col-actions">
                        <button
                            className="action-btn edit-btn"
                            title="Редактировать"
                            onClick={() => onEdit(training)}
                        >
                            ✎
                        </button>
                        <button
                            className="action-btn delete-btn"
                            title="Удалить"
                            onClick={() => onDelete(training.date)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};