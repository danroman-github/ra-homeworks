import { useState, useEffect, useCallback } from 'react';
import List from './components/List';
import Details from './components/Details';
import { User } from './types';
import './App.css';

const USERS_URL = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [usersError, setUsersError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        setLoadingUsers(true);
        setUsersError(null);
        const response = await fetch(USERS_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }


        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setUsersError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectUser = useCallback((user: User): void => {
    if (selectedUser?.id === user.id) return; // Prevent re-selecting same user
    setSelectedUser(user);
  }, [selectedUser]);

  return (
    <div className="app">
      <div className="container">
        <div className="list-section">
          {loadingUsers && <div className="loading-message">Loading users...</div>}
          {usersError && <div className="error-message">Error loading users: {usersError}</div>}
          {!loadingUsers && !usersError && (
            <List
              users={users}
              selectedUserId={selectedUser?.id || null}
              onSelectUser={handleSelectUser}
            />
          )}
        </div>
        <div className="details-section">
          <Details info={selectedUser} />
        </div>
      </div>
    </div>
  );
}

export default App;