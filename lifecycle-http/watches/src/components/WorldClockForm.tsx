import React, { useState } from 'react';

interface WorldClockFormProps {
    onAdd: (name: string, timezoneOffset: number) => void;
}

const WorldClockForm: React.FC<WorldClockFormProps> = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [timezoneOffset, setTimezoneOffset] = useState<string>('0');

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedName = name.trim();
        const offset = parseFloat(timezoneOffset);

        if (!trimmedName) {
            alert('Введите название города');
            return;
        }

        if (isNaN(offset) || offset < -12 || offset > 14) {
            alert('Введите корректный часовой пояс (от -12 до 14)');
            return;
        }

        onAdd(trimmedName, offset);
        setName('');
        setTimezoneOffset('0');
    };

    return (
        <form className="clock-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Название</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Временная зона</label>
                <input
                    type="number"
                    step="0.5"
                    value={timezoneOffset}
                    onChange={(e) => setTimezoneOffset(e.target.value)}
                    className="form-input"
                />
            </div>
            <div className="form-btn">
                <button type="submit" className="add-btn">
                    Добавить
                </button>
            </div>
        </form>
    );
};

export default WorldClockForm;