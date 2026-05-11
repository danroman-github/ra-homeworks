import React from 'react';
import { render, screen } from '@testing-library/react';
import withAuthorization from './withAuthorization';
import { CurrentUser } from '../types';

const TestComponent: React.FC<{ testProp?: string }> = ({ testProp }) => (
    <div data-testid="test-component">Protected Content {testProp}</div>
);

describe('withAuthorization HOC', () => {
    // Тест 1: Доступ разрешен
    test('renders wrapped component when user has allowed role', () => {
        const ProtectedComponent = withAuthorization(TestComponent, ['admin']);
        const currentUser: CurrentUser = { roles: ['admin'] };

        render(<ProtectedComponent currentUser={currentUser} testProp="hello" />);

        expect(screen.getByTestId('test-component')).toBeInTheDocument();
        expect(screen.getByText('Protected Content hello')).toBeInTheDocument();
    });

    // Тест 2: Доступ запрещен - неверная роль
    test('renders AccessDenied when user does not have allowed role', () => {
        const ProtectedComponent = withAuthorization(TestComponent, ['admin']);
        const currentUser: CurrentUser = { roles: ['user'] };

        render(<ProtectedComponent currentUser={currentUser} />);

        expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
        expect(screen.getByText('У вас нет прав для просмотра этого раздела')).toBeInTheDocument();
    });

    // Тест 3: Доступ запрещен - пользователь не авторизован
    test('renders AccessDenied when currentUser is null', () => {
        const ProtectedComponent = withAuthorization(TestComponent, ['admin']);

        render(<ProtectedComponent currentUser={null} />);

        expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
        expect(screen.getByText('У вас нет прав для просмотра этого раздела')).toBeInTheDocument();
    });

    // Тест 4: Доступ запрещен - currentUser отсутствует
    test('renders AccessDenied when currentUser is undefined', () => {
        const ProtectedComponent = withAuthorization(TestComponent, ['admin']);

        render(<ProtectedComponent />);

        expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
        expect(screen.getByText('У вас нет прав для просмотра этого раздела')).toBeInTheDocument();
    });

    // Тест 5: Доступ разрешен с несколькими ролями
    test('renders wrapped component when user has at least one allowed role', () => {
        const ProtectedComponent = withAuthorization(TestComponent, ['admin', 'moderator']);
        const currentUser: CurrentUser = { roles: ['user', 'moderator'] };

        render(<ProtectedComponent currentUser={currentUser} />);

        expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    // Тест 6: Кастомная заглушка
    test('renders custom AccessDenied component when provided', () => {
        const CustomDenied: React.FC = () => <div data-testid="custom-denied">Custom Denied Message</div>;
        const ProtectedComponent = withAuthorization(TestComponent, ['admin'], CustomDenied);
        const currentUser: CurrentUser = { roles: ['user'] };

        render(<ProtectedComponent currentUser={currentUser} />);

        expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
        expect(screen.getByTestId('custom-denied')).toBeInTheDocument();
        expect(screen.getByText('Custom Denied Message')).toBeInTheDocument();
    });

    // Тест 7: Передача пропсов
    test('passes all props to wrapped component when access granted', () => {
        const ProtectedComponent = withAuthorization(TestComponent, ['admin']);
        const currentUser: CurrentUser = { roles: ['admin'] };
        const props = { testProp: 'world', extraProp: 123 };

        render(<ProtectedComponent currentUser={currentUser} {...props} />);

        expect(screen.getByText('Protected Content world')).toBeInTheDocument();
    });
});
