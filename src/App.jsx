
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './Components/Home.jsx'
import AdminPage from './Components/Admin/AdminPage.jsx'
import { studentInputs } from './dataSource.jsx'
import Programs from './Components/Programs/Programs.jsx'
import About from './Components/About/About.jsx'
import ReleveController from './Components/Releve/ReleveController.jsx'
import StudentsList from './Components/Students/ListStudents.jsx'
import BulletinCP from './Components/Releve/Bulletin.jsx'
import DefaultBody from './Components/Admin/DefaultBody.jsx'
import New from './Components/pages/New.jsx'
import LoginPage from './Components/pages/Login/LoginPage.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
const App = () => {
  return (

  // <BrowserRouter>
      /* <AuthProvider>
        <Routes >
          <Route index element={<Home/>} />
          <Route path="/accueil" element={<Home/>} />
          <Route path="/programme" element={<Programs/>} />
          <Route path="/apropos" element={<About/>} />
          <Route path='admin'>
            {/* <Route index element={<AdminPage />} /> */
     /* <Route index element={<LoginPage />} />
            <Route path="releves" element={<AdminPage children={<ReleveController/>}/>} />
            <Route path="students">
              <Route index  element={<AdminPage children={<StudentsList/>}/>} />
              <Route path="new" element={<AdminPage children={<New title={'NOUVEAU ÉLÈVE'} inputs={studentInputs} />}/>} />
            </Route>
            <Route path="direction" element={<AdminPage children={<DefaultBody/>}/>}></Route>
            <Route path="teachers" element={<AdminPage children={<DefaultBody/>}/>}></Route>
            <Route path="parents" element={<AdminPage children={<DefaultBody/>}/>}></Route>
            <Route path="courses" element={<AdminPage children={<DefaultBody/>}/>}></Route>
            <Route path="classes" element={<AdminPage children={<DefaultBody/>}/>}></Route>
            <Route path="lessons" element={<AdminPage children={<DefaultBody/>}/>}></Route>
            <Route path="homeworks" element={<AdminPage children={<DefaultBody/>}/>}></Route>
            <Route path="exams" element={<AdminPage children={<DefaultBody/>}/>}></Route>
            <Route path="bulletins" element={<AdminPage children={<BulletinCP/>}/>} />
            <Route path="default" element={<AdminPage children={<DefaultBody/>}/>} />
            <Route path="settings" element={<AdminPage />} />
          </Route> */
      /* <Route path='/' */
      /* </Routes>
      </AuthProvider> */
    <AuthProvider>
      <Routes>

        {/* ── Routes publiques ── */}
        <Route index element={<Home />} />
        <Route path="/accueil" element={<Home />} />
        <Route path="/programme" element={<Programs />} />
        <Route path="/apropos" element={<About />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ── Routes admin protégées ── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
              <AdminPage />
            </ProtectedRoute>
          }
        >
          {/* Index → tableau de bord par défaut */}
          <Route index element={<DefaultBody />} />

          {/* Élèves */}
          <Route path="students">
            <Route index element={<StudentsList />} />
            <Route
              path="new"
              element={<New title="NOUVEAU ÉLÈVE" inputs={studentInputs} />}
            />
          </Route>

          {/* Autres sections */}
          <Route path="releves" element={<ReleveController />} />
          <Route path="bulletins" element={<BulletinCP />} />
          <Route path="direction" element={<DefaultBody />} />
          <Route path="teachers" element={<DefaultBody />} />
          <Route path="parents" element={<DefaultBody />} />
          <Route path="courses" element={<DefaultBody />} />
          <Route path="classes" element={<DefaultBody />} />
          <Route path="lessons" element={<DefaultBody />} />
          <Route path="homeworks" element={<DefaultBody />} />
          <Route path="exams" element={<DefaultBody />} />
          <Route path="settings" element={<DefaultBody />} />
        </Route>

        {/* ── Pages spéciales ── */}
        <Route
          path="/unauthorized"
          element={
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <h1 style={{ fontSize: '3rem' }}>403</h1>
              <p>Vous n'avez pas accès à cette page.</p>
              <a href="/login">Retour à la connexion</a>
            </div>
          }
        />

        {/* ── Fallback : toute URL inconnue → accueil ── */}
        <Route path="*" element={<Navigate to="/accueil" replace />} />

      </Routes>
    </AuthProvider> 

  )
}

export default App