/* AURESTA - Backend API Client */

window.AURESTA_API_BASE_URL = window.AURESTA_API_BASE_URL || 'http://localhost:5000/api';

async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${window.AURESTA_API_BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
  } catch (networkErr) {
    throw new Error('Could not reach the Auresta server. Please try again.');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.message || 'Something went wrong. Please try again.';
    const err = new Error(message);
    err.fieldErrors = data.errors || null;
    throw err;
  }

  return data;
}

window.AurestaAPI = {
  signup: (name, email, password) => apiRequest('/auth/signup', { method: 'POST', body: { name, email, password } }),
  login: (email, password) => apiRequest('/auth/login', { method: 'POST', body: { email, password } }),
  loginWithGoogle: (idToken) => apiRequest('/auth/google', { method: 'POST', body: { idToken } }),
  me: (token) => apiRequest('/auth/me', { token })
};
