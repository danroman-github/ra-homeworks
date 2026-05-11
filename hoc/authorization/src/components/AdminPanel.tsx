import React from 'react';
import { WithAuthorizationProps } from '../types';
import withAuthorization from '../hoc/withAuthorization';

interface AdminPanelProps extends WithAuthorizationProps {
    title?: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ title = 'Админ панель', currentUser }) => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
            <h1>{title}</h1>
            <p>Добро пожаловать, {currentUser?.roles?.join(', ')}!</p>
            <div>Секретные админ данные</div>
        </div>
    );
};

const AdminPanelWithAuth = withAuthorization(AdminPanel, ['admin']);

export default AdminPanelWithAuth;