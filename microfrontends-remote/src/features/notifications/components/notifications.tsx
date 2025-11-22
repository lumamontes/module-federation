import React, { useState } from 'react';
import { useNotifications } from '../model/use-notifications';
import { filterNotifications } from '../lib/notification-utils';
import { NotificationItem } from './notification-item';

export interface NotificationsProps {
  // Legacy prop for compatibility
}

/**
 * Notifications component - displays NASA mission notifications and alerts
 * Fetches data from NASA APOD API and transforms it into mission notifications
 */
export const Notifications: React.FC<NotificationsProps> = () => {
  const {
    notifications,
    unreadCount,
    isLoading,
    error,
    refetch,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const filteredNotifications = filterNotifications(notifications, filter);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            margin: '0 auto 1rem',
            border: '3px solid #4ecaff',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <p style={{ color: '#666' }}>Loading mission notifications...</p>
        <style>
          {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: '2rem',
          border: '2px solid #dc3545',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#dc3545' }}>
          Error loading notifications
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.9rem' }}>
          {error instanceof Error ? error.message : 'Failed to fetch data from NASA API'}
        </p>
        <button
          onClick={() => refetch()}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#4ecaff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>
            Mission Notifications
            {unreadCount > 0 && (
              <span
                style={{
                  marginLeft: '0.5rem',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                }}
              >
                {unreadCount} new
              </span>
            )}
          </h1>
          <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>
            Real-time updates and alerts from NASA missions
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              backgroundColor: filter === 'unread' ? '#4ecaff' : 'white',
              color: filter === 'unread' ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {filter === 'all' ? 'Show Unread' : 'Show All'}
          </button>
          {unreadCount > 0 && (
            <button
              onClick={() => markAllAsRead()}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                backgroundColor: 'white',
                color: '#333',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              Mark All Read
            </button>
          )}
          <button
            onClick={() => refetch()}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              backgroundColor: 'white',
              color: '#333',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
            title="Refresh notifications"
          >
            Refresh
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredNotifications.length === 0 ? (
          <div
            style={{
              padding: '3rem',
              textAlign: 'center',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <p style={{ margin: 0, color: '#666' }}>No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          ))
        )}
      </div>
    </div>
  );
};
