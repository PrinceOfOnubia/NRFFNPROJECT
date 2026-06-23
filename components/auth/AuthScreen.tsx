"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, Eye, EyeOff, GraduationCap, Lock, Mail, Phone, ShieldCheck, TrendingUp, User, Users } from "lucide-react";

type Role = "Associate" | "Client" | "Admin" | "Super Admin";

const DASH: Record<Role, string> = {
  Associate: "/associate/dashboard",
  Client: "/client/dashboard",
  Admin: "/admin/dashboard",
  "Super Admin": "/super-admin/dashboard"
};

const COPY: Record<Role, { label: string; tagline: string }> = {
  Associate: { label: "Realtor", tagline: "Build wealth, earn commissions and grow your network." },
  Client: { label: "Investor", tagline: "Invest in verified properties and track your portfolio." },
  Admin: { label: "Admin", tagline: "Manage members, properties and commissions." },
  "Super Admin": { label: "Super Admin", tagline: "Full control of the NRFFN platform." }
};

export default function AuthScreen({
  mode = "login",
  role: initialRole = "Associate",
  allowRoleSwitch = false
}: {
  mode?: "login" | "register";
  role?: Role;
  allowRoleSwitch?: boolean;
}) {
  const [role, setRole] = useState<Role>(initialRole);
  const [show, setShow] = useState(false);
  const isRegister = mode === "register";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.assign(DASH[role]);
  };

  return (
    <div className="nauth">
      <aside className="nauth__brand">
        <img className="bg" src="/img/auth.jpg" alt="" aria-hidden="true" />
        <span aria-hidden="true" />
        <div className="nauth__brand-mid">
          <h2>Nigeria&apos;s largest real estate wealth network</h2>
          <p>{COPY[role].tagline}</p>
          <div className="nauth__points">
            <div className="nauth__point"><span><GraduationCap size={17} /></span> Professional training &amp; certification</div>
            <div className="nauth__point"><span><TrendingUp size={17} /></span> Real estate investment opportunities</div>
            <div className="nauth__point"><span><Users size={17} /></span> Referral income &amp; national community</div>
          </div>
        </div>
        <div className="nauth__regs">
          <img src="/assets/regulator-cac.jpg" alt="CAC" />
          <img src="/assets/regulator-redan.jpg" alt="REDAN" />
          <img src="/assets/regulator-lasrera.jpg" alt="LASRERA" />
          <small>CAC registered · REDAN · LASRERA compliant</small>
        </div>
      </aside>

      <main className="nauth__form-wrap">
        <div className="nauth__card">
          <a href="/" className="nauth__back"><ArrowLeft size={16} /> Back to home</a>

          <span className="nauth__eyebrow">{COPY[role].label} portal</span>
          <h1>{isRegister ? "Create your account" : "Welcome back"}</h1>
          <p className="sub">{isRegister ? "Join free today and start building wealth." : "Sign in to continue to your dashboard."}</p>

          {allowRoleSwitch && (
            <div className="nauth__roles">
              {(["Associate", "Client"] as Role[]).map((r) => (
                <button key={r} type="button" className={role === r ? "on" : ""} onClick={() => setRole(r)}>{COPY[r].label}</button>
              ))}
            </div>
          )}

          <form onSubmit={submit}>
            {isRegister && (
              <div className="nauth__field">
                <label>Full name</label>
                <div className="nauth__inp"><User size={17} /><input required placeholder="e.g. Adaeze Nwankwo" /></div>
              </div>
            )}
            <div className="nauth__field">
              <label>Email address</label>
              <div className="nauth__inp"><Mail size={17} /><input type="email" required placeholder="you@email.com" /></div>
            </div>
            {isRegister && (
              <div className="nauth__field">
                <label>Phone number</label>
                <div className="nauth__inp"><Phone size={17} /><input required placeholder="+234 800 000 0000" /></div>
              </div>
            )}
            <div className="nauth__field">
              <label>Password</label>
              <div className="nauth__inp">
                <Lock size={17} />
                <input type={show ? "text" : "password"} required placeholder="••••••••" />
                <button type="button" onClick={() => setShow((s) => !s)} aria-label="Toggle password">{show ? <EyeOff size={17} /> : <Eye size={17} />}</button>
              </div>
            </div>

            {!isRegister && (
              <div className="nauth__row">
                <label><input type="checkbox" /> Remember me</label>
                <a href="#">Forgot password?</a>
              </div>
            )}
            {isRegister && (
              <div className="nauth__row" style={{ marginTop: "-.2rem" }}>
                <label><input type="checkbox" required /> I agree to the Terms &amp; Privacy Policy</label>
              </div>
            )}

            <button type="submit" className="nauth__btn">
              {isRegister ? "Create account" : "Sign in"} <ArrowRight size={18} />
            </button>
          </form>

          <div className="nauth__divider">{isRegister ? "Already a member?" : "New to NRFFN?"}</div>
          <p className="nauth__switch">
            {isRegister
              ? <>Have an account? <a href="/login">Sign in</a></>
              : <>Don&apos;t have an account? <a href={role === "Client" ? "/client/register" : "/associate/register"}>Join free today</a></>}
          </p>

          <p className="nauth__switch" style={{ marginTop: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: ".4rem", color: "var(--c-muted)", fontSize: ".78rem" }}>
            <ShieldCheck size={14} /> Bank-grade security · <BadgeCheck size={14} /> Verified platform
          </p>
        </div>
      </main>
    </div>
  );
}
