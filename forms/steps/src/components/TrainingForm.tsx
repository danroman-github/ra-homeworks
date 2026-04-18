import React, { useState, useEffect } from 'react';
import { formatDisplayDate } from '../utils/dateUtils';

interface TrainingFormProps {
    onSubmit: (date: string, distance: number) => void;
    editDate: string | null;
    editDistance: number | null;
    onClearEdit: () => void;
}

export const TrainingForm: React.FC<TrainingFormProps> = ({
    onSubmit,
    editDate,
    editDistance,
    onClearEdit
}) => {
    const [date, setDate] = useState('');
    const [distance, setDistance] = useState('');

    const clearForm = () => {
        setDate('');
        setDistance('');
    };

    useEffect(() => {
        if (editDate && editDistance !== null) {
            setDate(formatDisplayDate(editDate));
            setDistance(editDistance.toString());
        }
    }, [editDate, editDistance]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!date || !distance) return;
        const [day, month, year] = date.split('.');
        const formattedDate = `${year}-${month}-${day}`;

        onSubmit(formattedDate, parseFloat(distance));

        if (!editDate) {
            clearForm();
        } else {
            onClearEdit();
            clearForm();
        }
    };

    const handleCancel = () => {
        onClearEdit();
        clearForm();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
                    <input
                        type="text"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="distance">Пройдено км</label>
                    <input
                        type="number"
                        id="distance"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        step="0.1"
                        min="0"
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">
                    {editDate ? 'OK' : 'OK'}
                </button>

                {editDate && (
                    <button
                        type="button"
                        className="submit-btn cancel-btn"
                        onClick={handleCancel}
                    >
                        Отмена
                    </button>
                )}
            </div>
        </form>
    );
};