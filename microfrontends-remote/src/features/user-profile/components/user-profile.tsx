import React from 'react';

export interface UserProfileProps {
  name?: string;
  email?: string;
  avatar?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  name = 'John Doe',
  email = 'john.doe@example.com',
  avatar,
}) => {
  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '1.5rem',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        minWidth: '250px',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#4ecaff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        {avatar || name.charAt(0).toUpperCase()}
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '1.25rem' }}>
          {name}
        </h3>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{email}</p>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          width: '100%',
          marginTop: '0.5rem',
        }}
      >
        <button
          style={{
            flex: 1,
            padding: '0.5rem',
            backgroundColor: '#4ecaff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          Message
        </button>
        <button
          style={{
            flex: 1,
            padding: '0.5rem',
            backgroundColor: '#f8f9fa',
            color: '#333',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          Follow
        </button>
      </div>
    </div>
  );
};

