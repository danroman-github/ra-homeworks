import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilterStats, selectSearchTerm } from '../store/selectors';

const FilterStats: React.FC = () => {
    const stats = useSelector(selectFilterStats);
    const searchTerm = useSelector(selectSearchTerm);

    if (!searchTerm.trim()) {
        return (
            <div className="filter-stats">
                Всего услуг: <span className="stats-number">{stats.total}</span>
            </div>
        );
    }

    return (
        <div className="filter-stats">
            Найдено: <span className="stats-number">{stats.found}</span> из{' '}
            <span className="stats-number">{stats.total}</span> услуг
            {stats.found === 0 && <span className="stats-sad"> 😔</span>}
        </div>
    );
};

export default FilterStats;