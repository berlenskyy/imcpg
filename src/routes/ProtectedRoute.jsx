import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, loading } = useAuth();

//   if (loading) return <div>Chargement…</div>;
//   if (!user) return <Navigate to="/login" replace />;
//   if (allowedRoles && !allowedRoles.includes(user.role))
//     return <Navigate to="/unauthorized" replace />;

//   return children;
// };

// export default ProtectedRoute;


// Bloque l'accès aux routes admin si l'utilisateur n'est pas connecté
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}>
        Chargement…
      </div>
    )
  }

  // Pas connecté → rediriger vers login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Connecté mais mauvais rôle → page interdite
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
};
export default ProtectedRoute;