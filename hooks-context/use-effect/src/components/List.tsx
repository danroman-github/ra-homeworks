import React from 'react';
import { ListProps } from '../types';
import '../styles/List.css';

const List: React.FC<ListProps> = ({ users, selectedUserId, onSelectUser }) => {
    return (
        <ul className="user-list">
            {users.map((user) => (
                <li
                    key={user.id}
                    className={`user-item ${selectedUserId === user.id ? 'active' : ''}`}
                    onClick={() => onSelectUser(user)}
                >
                    {user.name}
                </li>
            ))}
        </ul>
    );
};

export default List;
