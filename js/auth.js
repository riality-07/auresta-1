/* AURESTA - Login & Signup */

/* Auth Page View */
function renderAuthView(state) {
  const auth = state.auth;
  const isLogin = auth.view === 'login';

  return `
    <div class="auth-page">
      <div class="auth-card fade-in-up">
        <div class="auth-header">
          <div class="logo-icon">👑</div>
          <div class="auth-title">${isLogin ? 'Welcome Back' : 'Create Your Account'}</div>
          <div class="auth-subtitle">${isLogin ? 'Log in to plan your next celebration' : 'Join Auresta to start planning your event'}</div>
        </div>

        <div class="auth-tabs">
          <button class="auth-tab ${isLogin ? 'active' : ''}" onclick="switchAuthTab('login')">Log In</button>
          <button class="auth-tab ${!isLogin ? 'active' : ''}" onclick="switchAuthTab('signup')">Sign Up</button>
        </div>

        ${auth.error ? `<div class="auth-error" style="margin-bottom:1.1rem;">${auth.error}</div>` : ''}

        <form class="auth-form" onsubmit="handleAuthSubmit(event, '${isLogin ? 'login' : 'signup'}')">
          ${!isLogin ? `
            <div class="field-group">
              <label class="field-label">Full Name</label>
              <input type="text" id="authName" class="field-input" placeholder="Anushka Sharma" required />
            </div>
          ` : ''}

          <div class="field-group">
            <label class="field-label">Email Address</label>
            <input type="email" id="authEmail" class="field-input" placeholder="you@example.com" required />
          </div>

          <div class="field-group">
            <label class="field-label">Password</label>
            <input type="password" id="authPassword" class="field-input" placeholder="${isLogin ? 'Your password' : 'At least 8 characters'}" minlength="${isLogin ? '1' : '8'}" required />
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%; padding:0.85rem; font-size:1rem; margin-top:0.4rem;" ${auth.loading ? 'disabled' : ''}>
            ${auth.loading ? 'Please wait...' : (isLogin ? 'Log In' : 'Create Account')}
          </button>
        </form>

        <div class="auth-divider">or continue with</div>

        <div class="google-btn-wrapper" id="googleSignInBtn"></div>

        <div class="auth-footer-note">
          ${isLogin ? `New to Auresta? <button onclick="switchAuthTab('signup')">Create an account</button>`
                     : `Already have an account? <button onclick="switchAuthTab('login')">Log in</button>`}
        </div>
      </div>
    </div>
  `;
}

/* Tab Switching */
function switchAuthTab(view) {
  window.appStore.setAuthView(view);
}

/* Email/Password Submit Handler */
async function handleAuthSubmit(event, mode) {
  event.preventDefault();

  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  const nameInput = document.getElementById('authName');
  const name = nameInput ? nameInput.value.trim() : '';

  window.appStore.setAuthLoading(true);

  try {
    const data = mode === 'signup'
      ? await window.AurestaAPI.signup(name, email, password)
      : await window.AurestaAPI.login(email, password);

    window.appStore.loginSuccess(data.token, data.user);
  } catch (err) {
    window.appStore.setAuthError(err.message);
  }
}

/* Log Out */
function logoutUser() {
  window.appStore.logout();
}

/* Google Identity Services Integration */
function renderGoogleButtonIfNeeded(state) {
  const container = document.getElementById('googleSignInBtn');
  if (!container) return;

  if (!window.google || !window.google.accounts || !window.google.accounts.id) {
    // Google Identity Services script hasn't finished loading yet — retry shortly.
    setTimeout(() => renderGoogleButtonIfNeeded(state), 300);
    return;
  }

  if (!window.AURESTA_GOOGLE_CLIENT_ID || window.AURESTA_GOOGLE_CLIENT_ID.includes('YOUR_')) {
    container.innerHTML = `<div style="font-size:0.78rem; color:var(--text-secondary); text-align:center;">Google Sign-In not configured yet.</div>`;
    return;
  }

  window.google.accounts.id.initialize({
    client_id: window.AURESTA_GOOGLE_CLIENT_ID,
    callback: handleGoogleCredentialResponse
  });

  window.google.accounts.id.renderButton(container, {
    theme: 'outline',
    size: 'large',
    width: 336,
    text: 'continue_with'
  });
}

async function handleGoogleCredentialResponse(response) {
  window.appStore.setAuthLoading(true);
  try {
    const data = await window.AurestaAPI.loginWithGoogle(response.credential);
    window.appStore.loginSuccess(data.token, data.user);
  } catch (err) {
    window.appStore.setAuthError(err.message);
  }
}
