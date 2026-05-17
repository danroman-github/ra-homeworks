import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, clearSearch } from '../store/filterSlice';
import { selectSearchTerm } from '../store/selectors';

const SearchFilter: React.FC = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            dispatch(setSearchTerm(localSearchTerm));
        }, 300);

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [localSearchTerm, dispatch]);

    const handleClear = () => {
        setLocalSearchTerm('');
        dispatch(clearSearch());
        inputRef.current?.focus();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchTerm(e.target.value);
    };

    return (
        <div className="search-filter">
            <div className="search-container">
                <div className="search-icon">🔍</div>
                <input
                    ref={inputRef}
                    type="text"
                    className="search-input"
                    placeholder="Поиск услуг..."
                    value={localSearchTerm}
                    onChange={handleChange}
                />
                {localSearchTerm && (
                    <button className="search-clear" onClick={handleClear} title="Очистить поиск">
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchFilter;