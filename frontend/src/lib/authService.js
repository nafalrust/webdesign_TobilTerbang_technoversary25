// Authentication Service
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

class AuthService {
  // Get stored token
  getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  }

  // Get refresh token
  getRefreshToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refresh_token");
    }
    return null;
  }

  // Store tokens
  setTokens(accessToken, refreshToken = null) {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", accessToken);
      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }
    }
  }

  // Clear tokens
  clearTokens() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    }
  }

  // Get stored user
  getStoredUser() {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  // Store user
  setStoredUser(user) {
    if (typeof window !== "undefined" && user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  // Login
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Login failed");
      }

      // Store tokens and user
      const token = data.session?.access_token;
      const refreshToken = data.session?.refresh_token;
      this.setTokens(token, refreshToken);
      this.setStoredUser(data.user);

      return {
        success: true,
        user: data.user,
        token,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Terjadi kesalahan saat login",
      };
    }
  }

  // Sign up
  async signup(email, password, fullName) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Signup failed");
      }

      // Store tokens and user
      const token = data.session?.access_token;
      const refreshToken = data.session?.refresh_token;
      this.setTokens(token, refreshToken);
      this.setStoredUser(data.user);

      return {
        success: true,
        user: data.user,
        token,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Terjadi kesalahan saat mendaftar",
      };
    }
  }

  // Google OAuth Login
  async loginWithGoogle(idToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_token: idToken }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Google login failed");
      }

      // Store tokens and user
      const token = data.session?.access_token;
      const refreshToken = data.session?.refresh_token;
      this.setTokens(token, refreshToken);
      this.setStoredUser(data.user);

      return {
        success: true,
        user: data.user,
        token,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Terjadi kesalahan saat login dengan Google",
      };
    }
  }

  // Logout
  async logout() {
    const token = this.getToken();

    if (token) {
      try {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }

    this.clearTokens();
    return { success: true };
  }

  // Get current user from API
  async getCurrentUser() {
    const token = this.getToken();

    if (!token) {
      return { success: false, error: "No token found" };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get user");
      }

      this.setStoredUser(data.user);

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Terjadi kesalahan saat mengambil data user",
      };
    }
  }

  // Refresh token
  async refreshToken() {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return { success: false, error: "No refresh token found" };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to refresh token");
      }

      const newToken = data.access_token || data.session?.access_token;
      const newRefreshToken = data.session?.refresh_token;
      this.setTokens(newToken, newRefreshToken);

      return {
        success: true,
        token: newToken,
      };
    } catch (error) {
      this.clearTokens();
      return {
        success: false,
        error: error.message || "Terjadi kesalahan saat refresh token",
      };
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService;
