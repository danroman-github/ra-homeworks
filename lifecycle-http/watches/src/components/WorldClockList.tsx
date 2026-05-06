import React from 'react';
import { CityClock } from '../types';
import WorldClock from './WorldClock';

interface WorldClockListProps {
    clocks: CityClock[];
    onRemove: (id: number) => void;
}

const WorldClockList: React.FC<WorldClockListProps> = ({ clocks, onRemove }) => {
    if (clocks.length === 0) {
        return (
            <div className="empty-state">
                <p>Нет добавленных часов</p>
                <p>Добавьте город с помощью формы выше</p>
            </div>
        );
    }

    return (
        <div className="clock-list">
            {clocks.map(clock => (
                <WorldClock
                    key={clock.id}
                    clock={clock}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
};

export default WorldClockList;