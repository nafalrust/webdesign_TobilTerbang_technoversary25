"""
Example service untuk integrasi dengan frontend
File ini bisa dijadikan referensi untuk membuat API service di frontend
"""

# Python Example - Backend Service Class
class TechnoversaryAPI:
    """
    Python client untuk Technoversary Backend API
    """
    
    def __init__(self, base_url="http://localhost:5000"):
        self.base_url = base_url
        self.token = None
    
    def set_token(self, token):
        """Set authentication token"""
        self.token = token
    
    def get_headers(self):
        """Get headers with authentication"""
        headers = {"Content-Type": "application/json"}
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"
        return headers
    
    # Auth methods
    def signup(self, email, password, full_name=""):
        """Register new user"""
        import requests
        response = requests.post(
            f"{self.base_url}/api/auth/signup",
            json={"email": email, "password": password, "full_name": full_name}
        )
        return response.json()
    
    def login(self, email, password):
        """Login user"""
        import requests
        response = requests.post(
            f"{self.base_url}/api/auth/login",
            json={"email": email, "password": password}
        )
        data = response.json()
        if response.status_code == 200:
            self.token = data.get("access_token")
        return data
    
    def get_profile(self):
        """Get user profile"""
        import requests
        response = requests.get(
            f"{self.base_url}/api/auth/me",
            headers=self.get_headers()
        )
        return response.json()
    
    def logout(self):
        """Logout user"""
        import requests
        response = requests.post(
            f"{self.base_url}/api/auth/logout",
            headers=self.get_headers()
        )
        self.token = None
        return response.json()


# JavaScript/TypeScript Example for Next.js Frontend
"""
// lib/api.ts or lib/api.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class TechnoversaryAPI {
  constructor() {
    this.token = null;
  }

  setToken(token) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  getToken() {
    if (this.token) return this.token;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth methods
  async signup(email, password, fullName = '') {
    const data = await this.request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name: fullName }),
    });
    
    if (data.session?.access_token) {
      this.setToken(data.session.access_token);
    }
    
    return data;
  }

  async login(email, password) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.access_token) {
      this.setToken(data.access_token);
    }
    
    return data;
  }

  async logout() {
    try {
      await this.request('/api/auth/logout', { method: 'POST' });
    } finally {
      this.clearToken();
    }
  }

  async getProfile() {
    return await this.request('/api/auth/me');
  }

  async refreshToken(refreshToken) {
    const data = await this.request('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    
    if (data.access_token) {
      this.setToken(data.access_token);
    }
    
    return data;
  }

  async resetPassword(email) {
    return await this.request('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async updatePassword(newPassword) {
    return await this.request('/api/auth/update-password', {
      method: 'POST',
      body: JSON.stringify({ new_password: newPassword }),
    });
  }

  // Database methods
  async getRecords(tableName, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/db/${tableName}${queryString ? `?${queryString}` : ''}`;
    return await this.request(endpoint);
  }

  async getRecord(tableName, recordId) {
    return await this.request(`/api/db/${tableName}/${recordId}`);
  }

  async createRecord(tableName, data) {
    return await this.request(`/api/db/${tableName}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateRecord(tableName, recordId, data) {
    return await this.request(`/api/db/${tableName}/${recordId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteRecord(tableName, recordId) {
    return await this.request(`/api/db/${tableName}/${recordId}`, {
      method: 'DELETE',
    });
  }

  async searchRecords(tableName, filters, options = {}) {
    return await this.request(`/api/db/${tableName}/search`, {
      method: 'POST',
      body: JSON.stringify({ filters, ...options }),
    });
  }
}

// Export singleton instance
export const api = new TechnoversaryAPI();
export default api;
"""

# React Hook Example
"""
// hooks/useAuth.ts or hooks/useAuth.js

import { useState, useEffect, createContext, useContext } from 'react';
import { api } from '@/lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const token = api.getToken();
      if (token) {
        const data = await api.getProfile();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      api.clearToken();
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    try {
      const data = await api.login(email, password);
      setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function signup(email, password, fullName) {
    try {
      const data = await api.signup(email, password, fullName);
      setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      await api.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
"""

# Next.js Page Example
"""
// app/login/page.tsx or pages/login.tsx

'use client'; // For Next.js 13+ App Router

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // or 'next/router' for Pages Router
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
"""

# Next.js Middleware Example for Protected Routes
"""
// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  // Check if accessing protected route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
"""

# Environment Variables untuk Frontend
"""
# .env.local (Next.js)

NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
"""
