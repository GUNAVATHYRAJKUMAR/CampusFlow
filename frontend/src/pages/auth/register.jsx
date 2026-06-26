import { useState, useId } from "react";
import {
  Eye, EyeOff, Zap, ArrowRight,
  BookOpen, CheckCircle2, BarChart3, AlertCircle,
} from "lucide-react";
import "../../styles/auth.css";
import "../../styles/register.css";

// ─── Shared sub-components (same as Login) ───────────────────────────────────

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 flex-shrink-0">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

const FEATURES = [
  { icon: BookOpen,     text: "AI-powered study planner & task tracker" },
  { icon: BarChart3,    text: "Real-time GPA analytics and insights"     },
  { icon: CheckCircle2, text: "Smart notices & deadline reminders"        },
];

// ─── Password strength ────────────────────────────────────────────────────────

function getStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8)              score++;
  if (pw.length >= 12)             score++;
  if (/[A-Z]/.test(pw))           score++;
  if (/[0-9]/.test(pw))           score++;
  if (/[^A-Za-z0-9]/.test(pw))   score++;

  if (score <= 1) return { score: 1, label: "Weak",   color: "strength--weak"   };
  if (score <= 2) return { score: 2, label: "Fair",   color: "strength--fair"   };
  if (score <= 3) return { score: 3, label: "Good",   color: "strength--good"   };
  return            { score: 4, label: "Strong", color: "strength--strong" };
}

function PasswordStrengthBar({ password }) {
  const { score, label, color } = getStrength(password);
  if (!password) return null;
  return (
    <div className="strength-wrap" aria-live="polite" aria-label={`Password strength: ${label}`}>
      <div className="strength-bars" aria-hidden="true">
        {[1, 2, 3, 4].map(n => (
          <div
            key={n}
            className={`strength-bar ${n <= score ? color : "strength-bar--empty"}`}
          />
        ))}
      </div>
      <span className={`strength-label ${color}`}>{label}</span>
    </div>
  );
}

// ─── Main Register Page ───────────────────────────────────────────────────────

export default function Register() {
  const uid = useId();

  const [fields, setFields] = useState({
    fullName:        "",
    email:           "",
    password:        "",
    confirmPassword: "",
    terms:           false,
  });

  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [errors,      setErrors]      = useState({});
  const [submitted,   setSubmitted]   = useState(false);

  // ── Field helper ──────────────────────────────────────────
  function set(key, value) {
    setFields(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: "" }));
  }

  // ── Validation ────────────────────────────────────────────
  function validate() {
    const e = {};
    const { fullName, email, password, confirmPassword, terms } = fields;

    if (!fullName.trim())
      e.fullName = "Full name is required.";
    else if (fullName.trim().length < 2)
      e.fullName = "Name must be at least 2 characters.";

    if (!email.trim())
      e.email = "University email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      e.email = "Enter a valid email address.";

    if (!password)
      e.password = "Password is required.";
    else if (password.length < 8)
      e.password = "Password must be at least 8 characters.";

    if (!confirmPassword)
      e.confirmPassword = "Please confirm your password.";
    else if (password && confirmPassword !== password)
      e.confirmPassword = "Passwords don't match.";

    if (!terms)
      e.terms = "You must accept the Terms & Conditions.";

    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    // No real API — simulate brief loading
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
  }

  function handleGoogle() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  }

  // ── Success state ─────────────────────────────────────────
  if (submitted) {
    return (
      <div className="auth-root" role="main">
        <div aria-hidden="true" className="aurora-blob aurora-blob--1" />
        <div aria-hidden="true" className="aurora-blob aurora-blob--2" />
        <div aria-hidden="true" className="aurora-blob aurora-blob--3" />
        <div className="reg-success-wrap">
          <div className="reg-success-card" role="status" aria-live="polite">
            <div className="reg-success-icon" aria-hidden="true">
              <CheckCircle2 strokeWidth={1.8} className="w-8 h-8 text-white" />
            </div>
            <h2 className="reg-success-title">Account created!</h2>
            <p className="reg-success-sub">
              Welcome to CampusFlow AI,{" "}
              <strong>{fields.fullName.split(" ")[0]}</strong>.
              <br />Check your inbox to verify your university email.
            </p>
            <a href="/login" className="submit-btn reg-success-link">
              <span>Go to Sign In</span>
              <ArrowRight className="w-4 h-4 submit-arrow" strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── Main form ─────────────────────────────────────────────
  return (
    <div className="auth-root" role="main">
      {/* Aurora blobs — identical to Login */}
      <div aria-hidden="true" className="aurora-blob aurora-blob--1" />
      <div aria-hidden="true" className="aurora-blob aurora-blob--2" />
      <div aria-hidden="true" className="aurora-blob aurora-blob--3" />

      <div className="auth-layout reg-layout">

        {/* ══ LEFT PANEL ══ */}
        <aside className="brand-panel" aria-label="CampusFlow features">
          <div className="brand-inner">
            {/* Logo */}
            <div className="brand-logo">
              <div className="logo-icon" aria-hidden="true">
                <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="logo-wordmark">
                CampusFlow<span className="logo-ai"> AI</span>
              </span>
            </div>

            {/* Headline — register-specific copy */}
            <div className="brand-headline">
              <h1>Start your journey<br /><span className="headline-accent">smarter, not harder.</span></h1>
              <p className="brand-sub">
                Set up your free account in 60 seconds and unlock AI tools built for student success.
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

            {/* Social proof */}
            <div
              className="social-proof"
              aria-label="Trusted by 12,000+ students across 200+ colleges"
            >
              <div className="avatar-stack" aria-hidden="true">
                {["bg-violet-500","bg-indigo-400","bg-sky-400","bg-emerald-400"].map((c, i) => (
                  <div key={i} className={`avatar-dot ${c}`} style={{ zIndex: 4 - i }} />
                ))}
              </div>
              <span><strong>12,000+</strong> students · 200+ colleges</span>
            </div>
          </div>
        </aside>

        {/* ══ RIGHT PANEL ══ */}
        <section className="form-panel reg-form-panel" aria-labelledby="register-heading">
          <div className="glass-card">

            {/* Card header */}
            <div className="card-header">
              {/* Mobile-only logo */}
              <div className="card-logo-mobile" aria-hidden="true">
                <div className="logo-icon logo-icon--sm">
                  <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="logo-wordmark text-sm">
                  CampusFlow<span className="logo-ai"> AI</span>
                </span>
              </div>
              <h2 id="register-heading" className="card-title">Create account</h2>
              <p className="card-subtitle">Free forever · No credit card required</p>
            </div>

            {/* Google SSO */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="google-btn"
              aria-label="Sign up with Google"
            >
              <GoogleIcon />
              <span>Sign up with Google</span>
            </button>

            {/* Divider */}
            <div className="divider" role="separator" aria-label="or sign up with email">
              <div className="divider-line" aria-hidden="true" />
              <span>or sign up with email</span>
              <div className="divider-line" aria-hidden="true" />
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} noValidate aria-label="Create account form">

              {/* Full Name */}
              <div className="field-group">
                <label htmlFor={`${uid}-name`} className="field-label">Full name</label>
                <input
                  id={`${uid}-name`}
                  type="text"
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  value={fields.fullName}
                  onChange={e => set("fullName", e.target.value)}
                  className={`field-input ${errors.fullName ? "field-input--error" : ""}`}
                  aria-describedby={errors.fullName ? `${uid}-name-err` : undefined}
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && (
                  <p id={`${uid}-name-err`} role="alert" className="field-error">
                    <AlertCircle className="w-3 h-3" aria-hidden="true" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* University Email */}
              <div className="field-group">
                <label htmlFor={`${uid}-email`} className="field-label">University email</label>
                <input
                  id={`${uid}-email`}
                  type="email"
                  autoComplete="email"
                  placeholder="you@university.edu"
                  value={fields.email}
                  onChange={e => set("email", e.target.value)}
                  className={`field-input ${errors.email ? "field-input--error" : ""}`}
                  aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p id={`${uid}-email-err`} role="alert" className="field-error">
                    <AlertCircle className="w-3 h-3" aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="field-group">
                <label htmlFor={`${uid}-pass`} className="field-label">Password</label>
                <div className="password-wrapper">
                  <input
                    id={`${uid}-pass`}
                    type={showPass ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Min. 8 characters"
                    value={fields.password}
                    onChange={e => set("password", e.target.value)}
                    className={`field-input password-input ${errors.password ? "field-input--error" : ""}`}
                    aria-describedby={`${uid}-pass-strength${errors.password ? ` ${uid}-pass-err` : ""}`}
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
                {/* Strength bar — only visible when typing */}
                <div id={`${uid}-pass-strength`}>
                  <PasswordStrengthBar password={fields.password} />
                </div>
                {errors.password && (
                  <p id={`${uid}-pass-err`} role="alert" className="field-error">
                    <AlertCircle className="w-3 h-3" aria-hidden="true" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="field-group">
                <label htmlFor={`${uid}-confirm`} className="field-label">Confirm password</label>
                <div className="password-wrapper">
                  <input
                    id={`${uid}-confirm`}
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    value={fields.confirmPassword}
                    onChange={e => set("confirmPassword", e.target.value)}
                    className={`field-input password-input ${errors.confirmPassword ? "field-input--error" : ""}`}
                    aria-describedby={errors.confirmPassword ? `${uid}-confirm-err` : undefined}
                    aria-invalid={!!errors.confirmPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(s => !s)}
                    className="password-toggle"
                    aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirm
                      ? <EyeOff className="w-4 h-4" strokeWidth={1.8} />
                      : <Eye    className="w-4 h-4" strokeWidth={1.8} />
                    }
                  </button>
                </div>
                {/* Match indicator */}
                {fields.confirmPassword && !errors.confirmPassword && fields.password && (
                  <p className="field-match" aria-live="polite">
                    {fields.confirmPassword === fields.password
                      ? <><CheckCircle2 className="w-3 h-3" aria-hidden="true" /> Passwords match</>
                      : <><AlertCircle  className="w-3 h-3" aria-hidden="true" /> Passwords don't match</>
                    }
                  </p>
                )}
                {errors.confirmPassword && (
                  <p id={`${uid}-confirm-err`} role="alert" className="field-error">
                    <AlertCircle className="w-3 h-3" aria-hidden="true" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className={`terms-group ${errors.terms ? "terms-group--error" : ""}`}>
                <label className="terms-label" htmlFor={`${uid}-terms`}>
                  <span className="terms-checkbox-wrap">
                    <input
                      id={`${uid}-terms`}
                      type="checkbox"
                      className="terms-input"
                      checked={fields.terms}
                      onChange={e => set("terms", e.target.checked)}
                      aria-describedby={errors.terms ? `${uid}-terms-err` : undefined}
                      aria-invalid={!!errors.terms}
                    />
                    <span className="terms-box" aria-hidden="true">
                      {fields.terms && (
                        <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                  </span>
                  <span className="terms-text">
                    I agree to the{" "}
                    <a href="/terms" className="terms-link" onClick={e => e.stopPropagation()}>
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="terms-link" onClick={e => e.stopPropagation()}>
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.terms && (
                  <p id={`${uid}-terms-err`} role="alert" className="field-error terms-error">
                    <AlertCircle className="w-3 h-3" aria-hidden="true" />
                    {errors.terms}
                  </p>
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
                    <span>Create account</span>
                    <ArrowRight className="w-4 h-4 submit-arrow" strokeWidth={2} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>

            {/* Login link */}
            <p className="register-prompt">
              Already have an account?{" "}
              <a href="/login" className="register-link">Sign in</a>
            </p>

          </div>
        </section>
      </div>
    </div>
  );
}
