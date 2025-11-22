import React from 'react';
import type { MissionNotification } from '../api/nasa-api';
import { getTypeColor, getPriorityColor, getTypeLabel } from '../lib/notification-utils';

export interface NotificationItemProps {
  notification: MissionNotification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * NotificationItem component for displaying individual notifications
 */
export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
}) => {
  return (
    <div
      style={{
        backgroundColor: notification.read ? 'white' : '#f0f7ff',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderLeft: `4px solid ${getTypeColor(notification.type)}`,
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div
          style={{
            minWidth: '60px',
            height: '60px',
            borderRadius: '8px',
            backgroundColor: `${getTypeColor(notification.type)}15`,
            color: getTypeColor(notification.type),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            border: `2px solid ${getTypeColor(notification.type)}`,
            textAlign: 'center',
            padding: '0.5rem',
          }}
        >
          {getTypeLabel(notification.type)}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div>
              <h3
                style={{
                  margin: '0 0 0.5rem 0',
                  color: '#333',
                  fontSize: '1.1rem',
                  fontWeight: notification.read ? '400' : '600',
                }}
              >
                {notification.title}
              </h3>
              <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {notification.message}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: `${getPriorityColor(notification.priority)}20`,
                    color: getPriorityColor(notification.priority),
                  }}
                >
                  {notification.priority}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#999' }}>
                  {notification.mission}
                </span>
              </div>
              <p style={{ margin: 0, color: '#999', fontSize: '0.85rem' }}>
                {notification.timestamp}
              </p>
            </div>
            {!notification.read && (
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#4ecaff',
                  flexShrink: 0,
                  marginTop: '0.5rem',
                }}
              />
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            {!notification.read && (
              <button
                onClick={() => onMarkAsRead(notification.id)}
                style={{
                  padding: '0.4rem 0.8rem',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#4ecaff',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                Mark as Read
              </button>
            )}
            <button
              onClick={() => onDelete(notification.id)}
              style={{
                padding: '0.4rem 0.8rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: 'white',
                color: '#666',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

