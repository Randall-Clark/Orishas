import React, { useState } from 'react';
import { registerUser } from '../services/auth';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await registerUser({ email, username, password});
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de l’inscription');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#AFB3B7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{
        maxWidth: '420px',
        width: '100%',
        background: '#fff',
        padding: '2.5rem',
        borderRadius: '20px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.10)'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '2rem',
          fontSize: '2rem',
          color: '#A56ABD',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}>
          Créer un compte
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <label style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.5rem' }}>Email :</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid #A56ABD',
              fontSize: '1.1rem',
              outline: 'none'
            }}
          />

          <label style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.5rem' }}>Nom d'utilisateur :</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid #A56ABD',
              fontSize: '1.1rem',
              outline: 'none'
            }}
          />

          <label style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.5rem' }}>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid #A56ABD',
              fontSize: '1.1rem',
              outline: 'none'
            }}
          />

          <button type="submit" style={{
            background: '#A56ABD',
            color: '#fff',
            border: 'none',
            padding: '1rem',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            marginTop: '0.5rem',
            letterSpacing: '1px'
          }}>
            S'inscrire
          </button>
        </form>

        {success && <p style={{ color: 'green', textAlign: 'center', marginTop: '1rem' }}>✅ Inscription réussie</p>}
        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Register;
