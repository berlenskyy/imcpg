 import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./LoginPage.css";
import * as Yup from "yup";

// ── Validation schema ──────────────────────────────────────────────────────────
const schema = Yup.object().shape({
  username: Yup.string()
    .required("Le nom d'utilisateur est obligatoire")
    .min(2, "Minimum 2 caractères"),
  password: Yup.string()
    .required("Le mot de passe est obligatoire")
    .min(8, "Minimum 8 caractères")
    .matches(/[A-Z]/, "Doit contenir une majuscule")
    .matches(/[0-9]/, "Doit contenir un chiffre")
    .matches(/[@$!%*?&]/, "Doit contenir un caractère spécial (@$!%*?&)"),
});

// ── Icons (inline SVG — no extra dependency) ──────────────────────────────────
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

const SchoolIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);


// ── Component ─────────────────────────────────────────────────────────────────
const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", password: "" },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  // ── Submit → appel Spring Boot API ────────────────────────────────────────
  const onSubmit = async (data) => {
    setLoading(true);
    setServerError(null);
    try {
      const role = await login(data.username, data.password);

      const routes = {
        ADMIN:   "/admin/dashboard",
        TEACHER: "/teacher/dashboard",
        STUDENT: "/student/dashboard",
        PARENT:  "/parent/dashboard",
      };
      navigate(routes[role] || "/dashboard");

    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <style>{styles}</style> */}
      <div className="lp-root">

        {/* ── Left panel ── */}
        <div className="lp-left">
          <div className="lp-deco-ring" style={{ width:500, height:500, bottom:-200, right:-180 }} />
          <div className="lp-deco-ring" style={{ width:300, height:300, top:80, right:-100 }} />

          <div className="lp-brand">
            <div className="lp-brand-icon"><SchoolIcon /></div>
            <div className="lp-brand-text">
              <strong>Institution Mixte Cérélus Pierre Glaude</strong>
              <span>Portail Académique</span>
            </div>
          </div>

          <div className="lp-hero">
            <h1>
              Bienvenue sur votre<br/>
              espace <em>scolaire</em>
            </h1>
            <p>
              Accédez à vos cours, notes, emplois du temps et communications depuis un seul espace sécurisé.
            </p>
          </div>

          <div className="lp-stats">
            <div className="lp-stat">
              <strong>200+</strong>
              <span>Élèves</span>
            </div>
            <div className="lp-stat">
              <strong>9+</strong>
              <span>Enseignants</span>
            </div>
            <div className="lp-stat">
              <strong>24/7</strong>
              <span>Accès</span>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="lp-right">
          <div className="lp-card">

            <div className="lp-card-header">
              <h2>Connexion</h2>
              <p>Entrez vos identifiants pour accéder à votre espace.</p>
            </div>

            {/* Server error banner */}
            {serverError && (
              <div className="lp-banner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {serverError}
              </div>
            )}

            {/* Success banner */}
            {successMsg && (
              <div className="lp-success">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>

              {/* Username */}
              <div className="lp-field">
                <label className="lp-label" htmlFor="username">Nom d'utilisateur</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon"><UserIcon /></span>
                  <input
                    id="username"
                    type="text"
                    placeholder="jean.dupont"
                    autoComplete="username"
                    className={`lp-input${errors.username ? " error" : ""}`}
                    {...register("username")}
                  />
                </div>
                {errors.username && (
                  <p className="lp-error">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="lp-field">
                <label className="lp-label" htmlFor="password">Mot de passe</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon"><LockIcon /></span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className={`lp-input${errors.password ? " error" : ""}`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="lp-eye-btn"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
                {errors.password && (
                  <p className="lp-error">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="lp-options">
                <label className="lp-remember">
                  <input type="checkbox" />
                  Se souvenir de moi
                </label>
                <a href="/forgot-password" className="lp-forgot">Mot de passe oublié ?</a>
              </div>

              {/* Submit */}
              <button type="submit" className="lp-btn" disabled={loading}>
                {loading ? (
                  <><div className="lp-spinner" /> Connexion…</>
                ) : (
                  "Se connecter"
                )}
              </button>

            </form>

            <p className="lp-footer">
              © {new Date().getFullYear()} Institution Mixte Cérélus Pierre Glaude — Tous droits réservés
            </p>
          </div>
        </div>

      </div>
    </>
  );
};

export default LoginPage;
















// import { useForm } from 'react-hook-form'
// import './LoginPage.css'
// // import { useForm , useFieldArray, set} from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from 'yup'

// const schema = Yup.object().shape({
//     username: Yup.string()
//         .required('Username est obligatoire')
//         .min(2,'minimum 2 caractères'), 
//     password: Yup.string()
//       .required("Mot de passe obligatoire")
//       .min(8, "Minimum 8 caractères")
//       .matches(/[A-Z]/, "Doit contenir une majuscule")
//       .matches(/[0-9]/, "Doit contenir un chiffre")
//       .matches(/[@$!%*?&]/, "Doit contenir un caractère spécial")
// })

// const { control, register, handleSubmit, trigger, getValues, formState:{errors}, } = useForm(
//     {
//         defaultValues: {
//             username: '',
//             password: ''
//         },
//         resolver: yupResolver(schema),
//         mode:'onBlur'
//     }
// );

// const LoginPage = () => {
//   return (
//     <div className='loginContainer'>
//         <h1> Welcome, Log into your account</h1>
//         <div className="loginFormWrapper">
//             <h2>It's a great pleasure to have you on board</h2>
//             <form action="" method="post">
//                 <div className='labelInputBox'>
//                     <label 
//                         htmlFor="username">Username</label>
//                     <input 
//                         type="text" 
//                         name="username" 
//                         id="username" 
//                         placeholder='johndoe'
//                         {...register('username', {required: true})}
//                     />
//                 </div>    
//                 <div className='labelInputBox'>
//                     <label htmlFor="password">Password</label>
//                     <input 
//                         type="password" 
//                         name="password" 
//                         id="password" 
//                         {...register('password', {required:true})}
//                     />
//                 </div>    
//                 <input type="submit" value="Log in" />
//                 {/* <button type="submit">Log in</button> */}
//             </form> 
//         </div> 
//     </div>
//   )
// }

// export default LoginPage