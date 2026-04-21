import React, { useState, useEffect } from 'react';

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
            setDate(editDate);
            setDistance(editDistance.toString());
        }
    }, [editDate, editDistance]);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        if (!date || !distance) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        const distanceNum = parseFloat(distance);
        if (isNaN(distanceNum) || distanceNum <= 0) {
            alert('Пожалуйста, введите корректное расстояние (больше 0)');
            return;
        }

        onSubmit(date, distanceNum);

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
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            style={{ flex: 1 }}
                        />
                    </div>
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