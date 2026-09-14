/* AURESTA - Backend API Client */

window.AURESTA_API_BASE_URL = window.AURESTA_API_BASE_URL || 'http://localhost:5000/api';

async function apiRequest(path, { method = 'GET', body, token, timeoutMs } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  // Optional request timeout so a stalled request cannot leave the UI waiting
  // forever. Only callers that opt in via timeoutMs (e.g. login) are affected.
  const controller = timeoutMs ? new AbortController() : null;
  const timeoutId = timeoutMs ? setTimeout(() => controller.abort(), timeoutMs) : null;

  let response;
  try {
    response = await fetch(`${window.AURESTA_API_BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller ? controller.signal : undefined
    });
  } catch (networkErr) {
    throw new Error('Could not reach the Auresta server. Please try again.');
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
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
  login: (email, password) => apiRequest('/auth/login', { method: 'POST', body: { email, password }, timeoutMs: 60000 }),
  me: (token) => apiRequest('/auth/me', { token })
};
