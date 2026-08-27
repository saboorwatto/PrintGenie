import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const LOGO = "/printgenie-logo.jpg";

function Logo({ small = false }) {
  return (
    <div className={`logo-wrap ${small ? "small-logo" : ""}`}>
      <img src={LOGO} alt="PrintGenie logo" className="logo-image" />
    </div>
  );
}

function BackButton({ onClick }) {
  return (
    <button className="back-button" onClick={onClick} aria-label="Go back">
      ←
    </button>
  );
}

function AuthLayout({ children, dark = false }) {
  return (
    <main className={dark ? "screen dark-screen" : "screen"}>
      <div className="auth-card">{children}</div>
    </main>
  );
}

function Splash({ goLogin, goSignup }) {
  return (
    <main className="splash">
      <div className="splash-glow glow-one" />
      <div className="splash-glow glow-two" />

      <section className="splash-content">
        <div className="logo-hero">
          <Logo />
        </div>

        <div className="hero-copy">
          <div className="eyebrow"><span /> SMART PRINTING PLATFORM <span /></div>
          <h1>Print Smart.<br /><span>Price Right.</span></h1>
          <p>
            Upload your design, get an AI-powered price estimate,
            compare print shops, and place your order with ease.
          </p>
        </div>

        <div className="feature-strip">
          <div><b>AI</b><span>Smart Estimates</span></div>
          <div><b>✓</b><span>Compare Shops</span></div>
          <div><b>⚡</b><span>Easy Ordering</span></div>
        </div>

        <div className="auth-actions">
          <button className="blue-button large" onClick={goLogin}>Login</button>
          <button className="outline-button large" onClick={goSignup}>Create an Account</button>
        </div>

        <p className="splash-footer">Your smarter way to print.</p>
      </section>
    </main>
  );
}

function Welcome({ goLogin, goSignup, back }) {
  return (
    <AuthLayout dark>
      <BackButton onClick={back} />
      <div className="center-content">
        <Logo small />
        <h1>Welcome to PrintGenie 👋</h1>
        <p className="muted light-text">
          Upload your design, get an AI-powered price estimate,
          compare printing presses and place your order easily.
        </p>
        <div className="dots"><span /><span /><span /></div>
        <button className="gold-button" onClick={goSignup}>Get Started</button>
        <button className="outline-button" onClick={goLogin}>Login</button>
      </div>
    </AuthLayout>
  );
}

function Login({ goSignup, goForgot, back, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (email !== "demo@printgenie.com" || password !== "123456") {
      setError("Invalid email or password.");
      return;
    }
    onLogin();
  }

  return (
    <main className="login-page">
      <div className="login-shell">
        <button className="login-back" onClick={back} aria-label="Go back">←</button>

        <div className="login-brand">
          <div className="login-brand-icon">▱</div>
          <span>PrintGenie</span>
        </div>

        <div className="login-heading">
          <p className="login-eyebrow">WELCOME BACK</p>
          <h1>Welcome Back! 👋</h1>
          <p>Login to continue to your PrintGenie account.</p>
        </div>

        <div className="login-form">
          <label>Email Address</label>
          <div className="login-input-wrap">
            <span>✉</span>
            <input type="email" placeholder="Enter your email" value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>

          <label>Password</label>
          <div className="login-input-wrap">
            <span>▣</span>
            <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
              value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" className="eye-button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button className="text-button right login-forgot" onClick={goForgot}>Forgot Password?</button>
          {error && <p className="error-message">{error}</p>}
          <button className="blue-button login-submit" onClick={handleLogin}>Login</button>

          <div className="divider"><span>or continue with</span></div>
          <div className="social-row">
            <button className="social-button"><b>G</b><span>Google</span></button>
            <button className="social-button"><b></b><span>Apple</span></button>
          </div>

          <p className="bottom-text login-bottom">
            Don't have an account? <button className="link-button" onClick={goSignup}>Sign Up</button>
          </p>
        </div>
      </div>
    </main>
  );
}

function Signup({ goRole, goLogin, back }) {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  function handleSignup() {
    setError("");
    if (!agreed) {
      setError("Please agree to the Terms & Conditions first.");
      return;
    }
    goRole();
  }

  return (
    <AuthLayout>
      <BackButton onClick={back} />
      <Logo small />
      <div className="form-heading">
        <h1>Create Account</h1>
        <p>Sign up to get started</p>
      </div>

      <label>Full Name</label>
      <input type="text" placeholder="Enter your full name" />

      <label>Email</label>
      <input type="email" placeholder="Enter your email" />

      <label>Phone Number</label>
      <input type="tel" placeholder="Enter your phone number" />

      <label>Password</label>
      <div className="password-box">
        <input type={showPassword ? "text" : "password"} placeholder="Create a password" />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <label className="checkbox-label">
        <input type="checkbox" checked={agreed}
          onChange={(e) => { setAgreed(e.target.checked); setError(""); }} />
        <span>I agree to the Terms & Conditions</span>
      </label>

      {error && <p className="error-message">{error}</p>}
      <button className="blue-button" onClick={handleSignup} disabled={!agreed}>Sign Up</button>

      <p className="bottom-text">
        Already have an account? <button className="link-button" onClick={goLogin}>Login</button>
      </p>
    </AuthLayout>
  );
}

function ForgotPassword({ goOtp, back }) {
  return (
    <AuthLayout>
      <BackButton onClick={back} />
      <Logo small />
      <div className="form-heading">
        <h1>Reset Password</h1>
        <p>Enter your email and we'll send you a link to reset your password.</p>
      </div>
      <div className="reset-icon">✦</div>
      <label>Email</label>
      <input type="email" placeholder="Enter your email" />
      <button className="blue-button" onClick={goOtp}>Send Reset Link</button>
    </AuthLayout>
  );
}

function OTP({ goRole, back }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  function updateOtp(index, value) {
    const copy = [...otp];
    copy[index] = value.slice(-1);
    setOtp(copy);
  }

  return (
    <AuthLayout>
      <BackButton onClick={back} />
      <Logo small />
      <div className="form-heading">
        <h1>Verify Your Email</h1>
        <p>Enter the 6-digit code sent to your email address.</p>
      </div>

      <div className="otp-row">
        {otp.map((digit, index) => (
          <input key={index} maxLength="1" value={digit}
            onChange={(e) => updateOtp(index, e.target.value)} />
        ))}
      </div>

      <p className="resend">
        Didn't receive code? <button className="link-button">Resend (00:30)</button>
      </p>
      <button className="blue-button" onClick={goRole}>Verify & Continue</button>
    </AuthLayout>
  );
}

function RoleSelection({ back, finish }) {
  const [role, setRole] = useState("Customer");
  const roles = [
    ["Customer", "I want to place orders", "🛒"],
    ["Print Shop Owner", "I want to manage my shop", "🏪"],
    ["Admin", "I want to manage platform", "⚙"]
  ];

  return (
    <AuthLayout>
      <BackButton onClick={back} />
      <Logo small />
      <div className="form-heading">
        <h1>Choose Your Role</h1>
        <p>Select the role that best describes you to continue.</p>
      </div>

      <div className="role-list">
        {roles.map(([name, description, icon]) => (
          <button key={name}
            className={role === name ? "role-card selected" : "role-card"}
            onClick={() => setRole(name)}>
            <span className="role-icon">{icon}</span>
            <span className="role-copy">
              <strong>{name}</strong>
              <small>{description}</small>
            </span>
            <span className="radio">{role === name ? "●" : "○"}</span>
          </button>
        ))}
      </div>

      <button className="blue-button" onClick={() => finish(role)}>Continue</button>
    </AuthLayout>
  );
}

function Success({ role, restart }) {
  return (
    <AuthLayout dark>
      <div className="center-content">
        <Logo small />
        <div className="success-icon">✓</div>
        <h1>You're all set!</h1>
        <p className="muted light-text">
          Your selected role is <strong>{role}</strong>.<br />
          This is the frontend demo for PrintGenie.
        </p>
        <button className="gold-button" onClick={restart}>Back to Start</button>
      </div>
    </AuthLayout>
  );
}

function App() {
  const [screen, setScreen] = useState("splash");
  const [role, setRole] = useState("");

  function finish(selectedRole) {
    setRole(selectedRole);
    setScreen("success");
  }

  return (
    <div className="app">
      {screen === "splash" && <Splash
        goLogin={() => setScreen("login")}
        goSignup={() => setScreen("signup")} />}

      {screen === "welcome" && <Welcome
        goLogin={() => setScreen("login")}
        goSignup={() => setScreen("signup")}
        back={() => setScreen("splash")} />}

      {screen === "login" && <Login
        goSignup={() => setScreen("signup")}
        goForgot={() => setScreen("forgot")}
        back={() => setScreen("welcome")}
        onLogin={() => setScreen("role")} />}

      {screen === "signup" && <Signup
        goRole={() => setScreen("role")}
        goLogin={() => setScreen("login")}
        back={() => setScreen("welcome")} />}

      {screen === "forgot" && <ForgotPassword
        goOtp={() => setScreen("otp")}
        back={() => setScreen("login")} />}

      {screen === "otp" && <OTP
        goRole={() => setScreen("role")}
        back={() => setScreen("forgot")} />}

      {screen === "role" && <RoleSelection
        back={() => setScreen("signup")}
        finish={finish} />}

      {screen === "success" && <Success
        role={role}
        restart={() => setScreen("splash")} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);