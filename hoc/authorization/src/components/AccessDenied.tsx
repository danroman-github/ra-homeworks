import React from 'react';
import { AccessDeniedProps } from '../types';

/**
 * Компонент, при отсутствии доступа
 */
const AccessDenied: React.FC<AccessDeniedProps> = ({
    message = 'У вас нет прав для просмотра этого раздела'
}) => {
    return (
        <div style={{
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #dee2e6',
            color: '#dc3545'
        }}>
            <p style={{ margin: 0 }}>{message}</p>
        </div>
    );
};

export default AccessDenied;