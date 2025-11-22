import React from 'react';
import { Link } from '@modern-js/runtime/router';

interface DashboardCardProps {
  title: string;
  description: string;
  isRemote: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, isRemote }) => {
  const routeMap: Record<string, string> = {
    'NEO Analytics': '/analytics',
    'Mission Personnel': '/users',
    'Mission Alerts': '/notifications',
    'API Settings': '/settings',
  };

  return (
    <Link
      to={routeMap[title]}
      style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        transition: 'all 0.2s ease',
        border: isRemote ? '1px solid rgba(78, 202, 255, 0.3)' : '1px solid transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <h3 style={{ margin: 0, color: '#333', fontSize: '1.1rem', fontWeight: '600' }}>
          {title}
        </h3>
        {isRemote && (
          <span
            style={{
              fontSize: '0.7rem',
              padding: '0.15rem 0.4rem',
              backgroundColor: 'rgba(78, 202, 255, 0.1)',
              color: '#4ecaff',
              borderRadius: '3px',
              fontFamily: 'monospace',
              fontWeight: '600',
            }}
            title="Loaded from remote microfrontend"
          >
            MF
          </span>
        )}
      </div>
      <p style={{ margin: 0, color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
        {description}
      </p>
    </Link>
  );
};

const Dashboard = () => {
  return (
    <div>
      <h1 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>
        Dashboard Overview
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Welcome to the Admin Panel. Navigate to different sections using the sidebar.
        The Analytics, Users, Notifications, and Settings sections are loaded from a remote
        microfrontend using Module Federation. This dashboard overview is hosted locally.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
        }}
      >
        <DashboardCard
          title="NEO Analytics"
          description="Near Earth Objects analytics with real-time data from NASA API"
          isRemote={true}
        />
        <DashboardCard
          title="Mission Personnel"
          description="Manage NASA mission personnel and crew assignments"
          isRemote={true}
        />
        <DashboardCard
          title="Mission Alerts"
          description="Real-time mission updates and critical alerts from NASA"
          isRemote={true}
        />
        <DashboardCard
          title="API Settings"
          description="Configure NASA API preferences and data refresh settings"
          isRemote={true}
        />
      </div>

      <div
        style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#f0f7ff',
          borderRadius: '8px',
          border: '1px solid #4ecaff',
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#1a73e8', fontSize: '1.1rem' }}>
          Architecture Overview
        </h3>
        <p style={{ margin: 0, color: '#5f6368', fontSize: '0.9rem', lineHeight: '1.6' }}>
          This dashboard demonstrates a production-ready microfrontend architecture using NASA's public APIs.
          The host application provides the shell (navigation, layout, and this dashboard overview). The feature
          modules (NEO Analytics, Mission Personnel, Mission Alerts, API Settings) are loaded from a remote
          microfrontend at runtime. All modules fetch real data from NASA's API using React Query. Components
          marked with "MF" are loaded from the remote application.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
