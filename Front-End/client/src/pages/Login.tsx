import React, { useState } from 'react';
import { loginUser } from '../services/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginUser(email, password);
      setToken(data.token);
      console.log('Utilisateur connecté:', data.user);
      // Tu peux stocker le token dans localStorage ou utiliser un context
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {token && <p style={{ color: 'green' }}>Connexion réussie ✅</p>}
    </div>
  );
};

export default Login;
