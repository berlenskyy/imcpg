import './Register.css'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


// ── Validation ────────────────────────────────────────────────────────────────
const schema = Yup.object().shape({
  firstName: Yup.string()
    .required("Prénom obligatoire")
    .min(2, "Minimum 2 caractères"),
  lastName: Yup.string()
    .required("Nom obligatoire")
    .min(2, "Minimum 2 caractères"),
  username: Yup.string()
    .required("Nom d'utilisateur obligatoire")
    .min(3, "Minimum 3 caractères")
    .matches(/^[a-z0-9._-]+$/, "Lettres minuscules, chiffres, . _ - uniquement"),
  email: Yup.string()
    .required("Email obligatoire")
    .email("Email invalide"),
  role: Yup.string()
    .required("Rôle obligatoire")
    .oneOf(["ADMIN", "TEACHER", "STUDENT", "PARENT"]),
  password: Yup.string()
    .required("Mot de passe obligatoire")
    .min(8, "Minimum 8 caractères")
    .matches(/[A-Z]/, "Doit contenir une majuscule")
    .matches(/[0-9]/, "Doit contenir un chiffre")
    .matches(/[@$!%*?&]/, "Doit contenir un caractère spécial"),
  confirmPassword: Yup.string()
    .required("Confirmation obligatoire")
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
});

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = ({ d, d2, circle, rect, poly, line }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {d  && <path d={d} />}
    {d2 && <path d={d2} />}
    {circle && <circle {...circle} />}
    {rect && <rect {...rect} />}
    {poly && <polyline points={poly} />}
    {line && <line {...line} />}
  </svg>
);

const icons = {
  user:  { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", circle: {cx:12,cy:7,r:4} },
  mail:  { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", d2:"M22 6l-10 7L2 6" },
  lock:  { d: "M7 11V7a5 5 0 0 1 10 0v4", rect:{x:3,y:11,width:18,height:11,rx:2,ry:2} },
  tag:   { d: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z", circle:{cx:7,cy:7,r:1} },
  eyeOn: { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", circle:{cx:12,cy:12,r:3} },
  eyeOff:{ d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19", line:{x1:1,y1:1,x2:23,y2:23} },
  check: { poly: "20 6 9 17 4 12" },
  warn:  { circle:{cx:12,cy:12,r:10}, d:"M12 8v4M12 16h.01" },
  school:{ d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", poly:"9 22 9 12 15 12 15 22" },
};

// ── Role options ──────────────────────────────────────────────────────────────
const ROLES = [
  { value: "ADMIN",   label: "Administrateur", emoji: "🏛️" },
  { value: "TEACHER", label: "Enseignant",      emoji: "📚" },
  { value: "STUDENT", label: "Élève",           emoji: "🎒" },
  { value: "PARENT",  label: "Parent",          emoji: "👨‍👩‍👧" },
];

// ── Password strength ─────────────────────────────────────────────────────────
const getStrength = (pwd) => {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8)          score++;
  if (/[A-Z]/.test(pwd))        score++;
  if (/[0-9]/.test(pwd))        score++;
  if (/[@$!%*?&]/.test(pwd))    score++;
  if (pwd.length >= 12)         score++;
  return score;
};

const strengthLabel = ["", "Très faible", "Faible", "Moyen", "Fort", "Très fort"];
const strengthColor = ["", "#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#27ae60"];


// ── Component ─────────────────────────────────────────────────────────────────
const RegisterPage = () => {
  const [showPassword, setShowPassword]        = useState(false);
  const [showConfirm,  setShowConfirm]          = useState(false);
  const [selectedRole, setSelectedRole]         = useState("");
  const [loading,      setLoading]              = useState(false);
  const [serverError,  setServerError]          = useState(null);
  const [success,      setSuccess]              = useState(false);
  const [currentStep,  setCurrentStep]          = useState(1); // 1 ou 2

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const passwordValue = watch("password", "");
  const confirmValue  = watch("confirmPassword", "");
  const strength      = getStrength(passwordValue);

  // Sélection du rôle via bouton
  const handleRoleSelect = (value) => {
    setSelectedRole(value);
    setValue("role", value, { shouldValidate: true });
  };

  // Passer à l'étape 2 après validation des champs étape 1
  const goToStep2 = async () => {
    const valid = await trigger(["firstName", "lastName", "username", "email", "role"]);
    if (valid) setCurrentStep(2);
  };

  // Soumission finale
  const onSubmit = async (data) => {
    setServerError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username:  data.username,
          password:  data.password,
          role:      data.role,
          firstName: data.firstName,
          lastName:  data.lastName,
          email:     data.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.message || "Une erreur est survenue.");
        return;
      }

      setSuccess(true);
      setTimeout(() => { window.location.href = "/login"; }, 2500);

    } catch {
      setServerError("Impossible de joindre le serveur. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const stepState = (n) =>
    currentStep === n ? "active" : currentStep > n ? "done" : "";

  return (
    <> 
      <div className="rp-root">
        <div className="rp-card">

          {/* ── Header ── */}
          <div className="rp-header">
            <div className="rp-brand">
              <div className="rp-brand-icon">
                <Icon {...icons.school} />
              </div>
              <div>
                <span className="rp-brand-name">Institution Mixte Cérélus Pierre Glaude</span>
                <span className="rp-brand-sub">Portail Académique</span>
              </div>
            </div>
            <h1>Créer un <em>compte</em></h1>
            <p>Remplissez le formulaire pour accéder au portail scolaire.</p>
          </div>

          {/* ── Body ── */}
          <div className="rp-body">

            {/* Étapes */}
            <div className="rp-steps">
              <div className={`rp-step ${stepState(1)}`}>
                <div className="rp-step-dot">
                  {currentStep > 1
                    ? <Icon {...icons.check} />
                    : "1"}
                </div>
                <span className="rp-step-label">Identité</span>
              </div>
              <div className="rp-step-line" />
              <div className={`rp-step ${stepState(2)}`}>
                <div className="rp-step-dot">2</div>
                <span className="rp-step-label">Sécurité</span>
              </div>
            </div>

            {/* Banners */}
            {serverError && (
              <div className="rp-banner error">
                <Icon {...icons.warn} />
                {serverError}
              </div>
            )}
            {success && (
              <div className="rp-banner success">
                <Icon {...icons.check} />
                Compte créé avec succès ! Redirection vers la connexion…
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>

              {/* ══ Étape 1 : Identité ══════════════════════════════════════ */}
              {currentStep === 1 && (
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

                  {/* Prénom / Nom */}
                  <div className="rp-grid-2">
                    <div className="rp-field">
                      <label className="rp-label">Prénom</label>
                      <div className="rp-input-wrap">
                        <span className="rp-icon"><Icon {...icons.user} /></span>
                        <input
                          className={`rp-input${errors.firstName ? " error" : ""}`}
                          placeholder="Marie"
                          {...register("firstName")}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="rp-error-msg"><Icon {...icons.warn} />{errors.firstName.message}</p>
                      )}
                    </div>

                    <div className="rp-field">
                      <label className="rp-label">Nom</label>
                      <div className="rp-input-wrap">
                        <span className="rp-icon"><Icon {...icons.user} /></span>
                        <input
                          className={`rp-input${errors.lastName ? " error" : ""}`}
                          placeholder="Dupont"
                          {...register("lastName")}
                        />
                      </div>
                      {errors.lastName && (
                        <p className="rp-error-msg"><Icon {...icons.warn} />{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Username */}
                  <div className="rp-field">
                    <label className="rp-label">Nom d'utilisateur</label>
                    <div className="rp-input-wrap">
                      <span className="rp-icon"><Icon {...icons.tag} /></span>
                      <input
                        className={`rp-input${errors.username ? " error" : ""}`}
                        placeholder="marie.dupont"
                        autoComplete="username"
                        {...register("username")}
                      />
                    </div>
                    {errors.username && (
                      <p className="rp-error-msg"><Icon {...icons.warn} />{errors.username.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="rp-field">
                    <label className="rp-label">Email</label>
                    <div className="rp-input-wrap">
                      <span className="rp-icon"><Icon {...icons.mail} /></span>
                      <input
                        type="email"
                        className={`rp-input${errors.email ? " error" : ""}`}
                        placeholder="marie.dupont@ecole.ht"
                        autoComplete="email"
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <p className="rp-error-msg"><Icon {...icons.warn} />{errors.email.message}</p>
                    )}
                  </div>

                  {/* Rôle */}
                  <div className="rp-field">
                    <label className="rp-label">Rôle</label>
                    <div className="rp-roles">
                      {ROLES.map((r) => (
                        <button
                          key={r.value}
                          type="button"
                          className={`rp-role-btn${selectedRole === r.value ? " selected" : ""}`}
                          onClick={() => handleRoleSelect(r.value)}
                        >
                          <span className="rp-role-emoji">{r.emoji}</span>
                          <span className="rp-role-label">{r.label}</span>
                        </button>
                      ))}
                    </div>
                    {/* hidden input pour react-hook-form */}
                    <input type="hidden" {...register("role")} />
                    {errors.role && (
                      <p className="rp-error-msg"><Icon {...icons.warn} />{errors.role.message}</p>
                    )}
                  </div>

                  {/* Bouton suivant */}
                  <button
                    type="button"
                    className="rp-submit"
                    style={{ marginTop: 8 }}
                    onClick={goToStep2}
                  >
                    Continuer →
                  </button>
                </div>
              )}

              {/* ══ Étape 2 : Sécurité ══════════════════════════════════════ */}
              {currentStep === 2 && (
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

                  {/* Mot de passe */}
                  <div className="rp-field">
                    <label className="rp-label">Mot de passe</label>
                    <div className="rp-input-wrap">
                      <span className="rp-icon"><Icon {...icons.lock} /></span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`rp-input${errors.password ? " error" : ""}`}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...register("password")}
                      />
                      <button
                        type="button"
                        className="rp-eye"
                        onClick={() => setShowPassword(v => !v)}
                      >
                        <Icon {...(showPassword ? icons.eyeOff : icons.eyeOn)} />
                      </button>
                    </div>

                    {/* Barre de force */}
                    {passwordValue && (
                      <div className="rp-strength">
                        <div className="rp-strength-bars">
                          {[1,2,3,4,5].map(i => (
                            <div
                              key={i}
                              className="rp-strength-bar"
                              style={{ background: i <= strength ? strengthColor[strength] : undefined }}
                            />
                          ))}
                        </div>
                        <span className="rp-strength-text" style={{ color: strengthColor[strength] }}>
                          {strengthLabel[strength]}
                        </span>
                      </div>
                    )}

                    {errors.password && (
                      <p className="rp-error-msg"><Icon {...icons.warn} />{errors.password.message}</p>
                    )}
                  </div>

                  {/* Confirmer mot de passe */}
                  <div className="rp-field">
                    <label className="rp-label">Confirmer le mot de passe</label>
                    <div className="rp-input-wrap">
                      <span className="rp-icon"><Icon {...icons.lock} /></span>
                      <input
                        type={showConfirm ? "text" : "password"}
                        className={`rp-input${errors.confirmPassword ? " error" : ""}`}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...register("confirmPassword")}
                      />
                      <button
                        type="button"
                        className="rp-eye"
                        onClick={() => setShowConfirm(v => !v)}
                      >
                        <Icon {...(showConfirm ? icons.eyeOff : icons.eyeOn)} />
                      </button>
                    </div>

                    {/* Indicateur correspondance */}
                    {confirmValue && !errors.confirmPassword && (
                      <p className="rp-match" style={{ color:"#68d391" }}>
                        <Icon {...icons.check} /> Les mots de passe correspondent
                      </p>
                    )}
                    {errors.confirmPassword && (
                      <p className="rp-error-msg"><Icon {...icons.warn} />{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  {/* Règles */}
                  <div style={{
                    background:"#0e1117", border:"1px solid #1e2535",
                    borderRadius:9, padding:"12px 14px",
                    display:"flex", flexDirection:"column", gap:6
                  }}>
                    {[
                      ["Minimum 8 caractères",        /.{8,}/.test(passwordValue)],
                      ["Une lettre majuscule",         /[A-Z]/.test(passwordValue)],
                      ["Un chiffre",                  /[0-9]/.test(passwordValue)],
                      ["Un caractère spécial (@$!%*?&)", /[@$!%*?&]/.test(passwordValue)],
                    ].map(([label, ok]) => (
                      <div key={label} style={{
                        display:"flex", alignItems:"center", gap:8,
                        fontSize:"0.77rem",
                        color: ok ? "#68d391" : "#4a5568"
                      }}>
                        <Icon {...(ok ? icons.check : icons.warn)} />
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* Boutons navigation */}
                  <div style={{ display:"flex", gap:10, marginTop:4 }}>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      style={{
                        flex:1, padding:"12px",
                        background:"transparent",
                        border:"1.5px solid #2a3347",
                        borderRadius:10,
                        color:"#8892a4",
                        fontFamily:"'Jost', sans-serif",
                        fontSize:"0.9rem",
                        cursor:"pointer",
                        transition:"border-color 0.2s, color 0.2s",
                      }}
                      onMouseEnter={e => { e.target.style.borderColor="#63b3ed"; e.target.style.color="#63b3ed"; }}
                      onMouseLeave={e => { e.target.style.borderColor="#2a3347"; e.target.style.color="#8892a4"; }}
                    >
                      ← Retour
                    </button>

                    <button
                      type="submit"
                      className="rp-submit"
                      style={{ flex:2, marginTop:0 }}
                      disabled={loading || success}
                    >
                      {loading
                        ? <><div className="rp-spinner" /> Création…</>
                        : "Créer le compte"}
                    </button>
                  </div>
                </div>
              )}

            </form>

            {/* Footer */}
            <p className="rp-footer">
              Déjà un compte ?{" "}
              <a href="/login">Se connecter</a>
            </p>

          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;