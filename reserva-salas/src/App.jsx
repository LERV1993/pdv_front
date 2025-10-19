// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { AuthScreen } from './pages/AuthScreen';
import { FullScreenLoader } from './components/shared/Loader';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';


// Componente para Rutas Protegidas
const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullScreenLoader />; // Muestra un spinner mientras carga el usuario
  }

  if (!user) {
    // Si no hay usuario, lo mandamos al login
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Si es un rol no autorizado (ej. un 'user' intentando ir a 'admin')
    // lo mandamos a su dashboard correcto.
    return <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />;
  }

  // Si todo está bien, muestra la página (UserDashboard o AdminDashboard)
  return <Outlet />; 
};

// Componente para Rutas de Autenticación
const AuthRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <FullScreenLoader />;
  }

  if (user) {
    // Si ya está logueado, lo redirige a su dashboard
    return <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />;
  }
  
  // Si no está logueado, muestra la página de Login
  return <Outlet />; 
};

function App() {
  // Aplicamos las clases de fondo a todo el contenedor
  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <Routes>
        {/* Rutas Públicas (solo para no logueados) */}
        <Route element={<AuthRoute />}>
          <Route path="/auth" element={<AuthScreen />} />
        </Route>

        {/* Rutas Protegidas para 'user' */}
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="/" element={<UserDashboard />} />
        </Route>
        
        {/* Rutas Protegidas para 'admin' */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        
        {/* Fallback por si escriben cualquier otra cosa */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;