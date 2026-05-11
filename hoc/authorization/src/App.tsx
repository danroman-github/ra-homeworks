import React, { useState } from 'react';
import AdminPanelWithAuth from './components/AdminPanel';
import withAuthorization from './hoc/withAuthorization';
import { CurrentUser } from './types';

const UserDashboard: React.FC<any> = () => {
  return <div>Пользовательская панель</div>;
};

const UserDashboardWithAuth = withAuthorization(UserDashboard, ['user', 'admin']);

// Пример защищенного компонента для модераторов
const ModerationPanel: React.FC<any> = () => {
  return <div>Панель модератора</div>;
};

const ModerationPanelWithAuth = withAuthorization(ModerationPanel, ['moderator', 'admin']);

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const switchUser = (role: string) => {
    setCurrentUser({ roles: [role] });
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => switchUser('admin')}>Войти как Admin</button>
        <button onClick={() => switchUser('user')}>Войти как User</button>
        <button onClick={() => switchUser('moderator')}>Войти как Moderator</button>
        {/* Исправлено: убрана лишняя закрывающая скобка */}
        <button onClick={() => setCurrentUser(null)}>Выйти</button>
        <p>Текущий пользователь: {currentUser?.roles?.join(', ') || 'Не авторизован'}</p>
      </div>

      <hr />

      <h2>Админ панель (доступ: admin)</h2>
      <AdminPanelWithAuth currentUser={currentUser} title="Управление системой" />

      <hr />

      <h2>Панель пользователя (доступ: user, admin)</h2>
      <UserDashboardWithAuth currentUser={currentUser} />

      <hr />

      <h2>Панель модератора (доступ: moderator, admin)</h2>
      <ModerationPanelWithAuth currentUser={currentUser} />
    </div>
  );
}

export default App;