import React, { useState } from 'react';

export interface CounterProps {
  initialValue?: number;
  label?: string;
}

export const Counter: React.FC<CounterProps> = ({ initialValue = 0, label = 'Counter' }) => {
  const [count, setCount] = useState(initialValue);

  return (
    <div
      style={{
        border: '2px solid #4ecaff',
        borderRadius: '12px',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        textAlign: 'center',
        minWidth: '200px',
      }}
    >
      <h3 style={{ margin: '0 0 1rem 0', color: '#333', fontSize: '1.1rem' }}>
        {label}
      </h3>
      <div
        style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#4ecaff',
          margin: '1rem 0',
        }}
      >
        {count}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button
          onClick={() => setCount(count - 1)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          −
        </button>
        <button
          onClick={() => setCount(0)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#51cf66',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

