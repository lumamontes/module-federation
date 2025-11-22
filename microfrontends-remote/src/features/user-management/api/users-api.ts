/**
 * Users API client
 * Uses JSONPlaceholder as a fake REST API for demonstration
 * Documentation: https://jsonplaceholder.typicode.com/
 */

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserWithMetadata extends User {
  role: 'admin' | 'user' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

/**
 * Fetch all users from API
 */
export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Fetch a single user by ID
 */
export const fetchUserById = async (id: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Transform API user to user with metadata
 */
export const transformUser = (user: User, index: number): UserWithMetadata => {
  const roles: Array<'admin' | 'user' | 'viewer'> = ['admin', 'user', 'viewer'];
  const statuses: Array<'active' | 'inactive'> = ['active', 'inactive'];
  
  // Assign roles and statuses based on index for variety
  const role = roles[index % roles.length];
  const status = index % 3 === 0 ? 'inactive' : 'active';
  
  // Generate realistic last login times
  const hoursAgo = Math.floor(Math.random() * 72);
  const lastLogin = hoursAgo === 0 
    ? 'Just now' 
    : hoursAgo === 1 
    ? '1 hour ago' 
    : hoursAgo < 24 
    ? `${hoursAgo} hours ago` 
    : `${Math.floor(hoursAgo / 24)} days ago`;
  
  return {
    ...user,
    role,
    status,
    lastLogin,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  };
};

