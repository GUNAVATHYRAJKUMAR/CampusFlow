import { useState } from "react";
import { Eye, EyeOff, Zap, ArrowRight, BookOpen, CheckCircle2, BarChart3 } from "lucide-react";
import "../../styles/auth.css";

// ─── Reusable sub-components ────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 flex-shrink-0">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

const FEATURES = [
  { icon: BookOpen, text: "AI-powered study planner & task tracker" },
  { icon: BarChart3, text: "Real-time GPA analytics and insights" },
  { icon: CheckCircle2, text: "Smart notices & deadline reminders" },
];

// ─── Main Login Page ─────────────────────────────────────────────────────────

export default function Login() {
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errors, setErrors]       = useState({});

  // Simple client-side validation (no API call)
  function validate() {
    const e = {};
    if (!email.trim())                          e.email    = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))      e.email    = "Enter a valid email address.";
    if (!password)                              e.password = "Password is required.";
    else if (password.length < 6)              e.password = "Password must be at least 6 characters.";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    // Simulate brief loading state (no real API)
    setTimeout(() => setLoading(false), 1800);
  }

  function handleGoogleContinue() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  }

  return (
    <div className="auth-root" role="main">
      {/* ── Ambient aurora blobs ── */}
      <div aria-hidden="true" className="aurora-blob aurora-blob--1" />
      <div aria-hidden="true" className="aurora-blob aurora-blob--2" />
      <div aria-hidden="true" className="aurora-blob aurora-blob--3" />

      <div className="auth-layout">
        {/* ══ LEFT PANEL – Brand / Value Prop ══ */}
        <aside className="brand-panel" aria-label="CampusFlow features">
          <div className="brand-inner">
            {/* Logo */}
            <div className="brand-logo">
              <div className="logo-icon" aria-hidden="true">
                <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="logo-wordmark">CampusFlow<span className="logo-ai"> AI</span></span>
            </div>

            {/* Headline */}
            <div className="brand-headline">
              <h1>Your campus life,<br /><span className="headline-accent">intelligently organized.</span></h1>
              <p className="brand-sub">
                Join thousands of students who manage tasks, deadlines, and academic goals with AI-assisted clarity.
              </p>
            </div>

            {/* Feature list */}
            <ul className="feature-list" role="list">
              {FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="feature-item">
                  <div className="feature-icon" aria-hidden="true">
                    <Icon className="w-4 h-4 text-indigo-400" strokeWidth={1.8} />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            {/* Social proof pill */}
            <div className="social-proof" aria-label="Trusted by 12,000+ students across 200+ colleges">
              <div className="avatar-stack" aria-hidden="true">
                {["bg-violet-500","bg-indigo-400","bg-sky-400","bg-emerald-400"].map((c, i) => (
                  <div key={i} className={`avatar-dot ${c}`} style={{ zIndex: 4 - i }} />
                ))}
              </div>
              <span><strong>12,000+</strong> students · 200+ colleges</span>
            </div>
          </div>
        </aside>

        {/* ══ RIGHT PANEL – Glass Card ══ */}
        <section className="form-panel" aria-labelledby="login-heading">
          <div className="glass-card">
            {/* Card header */}
            <div className="card-header">
              <div className="card-logo-mobile" aria-hidden="true">
                <div className="logo-icon logo-icon--sm">
                  <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="logo-wordmark text-sm">CampusFlow<span className="logo-ai"> AI</span></span>
              </div>
              <h2 id="login-heading" className="card-title">Welcome back</h2>
              <p className="card-subtitle">Sign in to your student dashboard</p>
            </div>

            {/* Google SSO */}
            <button
              type="button"
              onClick={handleGoogleContinue}
              disabled={loading}
              className="google-btn"
              aria-label="Continue with Google"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="divider" role="separator" aria-label="or sign in with email">
              <div className="divider-line" aria-hidden="true" />
              <span>or continue with email</span>
              <div className="divider-line" aria-hidden="true" />
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} noValidate aria-label="Sign in form">
              {/* Email */}
              <div className="field-group">
                <label htmlFor="email" className="field-label">Email address</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(ev => ({ ...ev, email: "" })); }}
                  className={`field-input ${errors.email ? "field-input--error" : ""}`}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="field-error">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="field-group">
                <div className="field-label-row">
                  <label htmlFor="password" className="field-label">Password</label>
                  <a href="/forgot-password" className="forgot-link" tabIndex={0}>
                    Forgot password?
                  </a>
                </div>
                <div className="password-wrapper">
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setErrors(ev => ({ ...ev, password: "" })); }}
                    className={`field-input password-input ${errors.password ? "field-input--error" : ""}`}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    aria-invalid={!!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    className="password-toggle"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass
                      ? <EyeOff className="w-4 h-4" strokeWidth={1.8} />
                      : <Eye    className="w-4 h-4" strokeWidth={1.8} />
                    }
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" role="alert" className="field-error">{errors.password}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
                aria-busy={loading}
              >
                {loading ? (
                  <span className="spinner" aria-hidden="true" />
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4 submit-arrow" strokeWidth={2} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>

            {/* Register link */}
            <p className="register-prompt">
              Don't have an account?{" "}
              <a href="/register" className="register-link">
                Create one free
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
