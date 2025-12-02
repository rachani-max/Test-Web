import React, { useState } from 'react';
import { AuthStatus, User } from './types';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.IDLE);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (username: string) => {
    setStatus(AuthStatus.AUTHENTICATING);
    
    // Simulate API delay
    setTimeout(() => {
      setUser({ username, email: `${username}@example.com` });
      setStatus(AuthStatus.AUTHENTICATED);
    }, 1200);
  };

  const handleLogout = () => {
    setUser(null);
    setStatus(AuthStatus.IDLE);
  };

  return (
    <div className="antialiased text-gray-900 bg-chula-bg min-h-screen">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-pink-100 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-orange-100 opacity-30 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {status === AuthStatus.AUTHENTICATED && user ? (
          <Dashboard user={user} onLogout={handleLogout} />
        ) : (
          <LoginForm onLogin={handleLogin} status={status} />
        )}
      </div>
    </div>
  );
};

export default App;
