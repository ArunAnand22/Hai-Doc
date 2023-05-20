import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/Admin/Users';
import Doctors from './pages/Admin/Doctors';
import Profile from './pages/doctor/Profile';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/doctor/DoctorAppointments';

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <>
     <Router>
      {loading ? <Spinner/> :
      <Routes>
        <Route path="/" 
        element={
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        }/>
        <Route path="/apply-doctor" 
        element={
          <ProtectedRoute>
            <ApplyDoctor/>
          </ProtectedRoute>
        }
        />
        <Route path="/admin/users" 
        element={
          <ProtectedRoute>
            <Users/>
          </ProtectedRoute>
        }
        />
         <Route path="/doctor/profile/:id" 
        element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }
        />
        <Route path="/doctor/book-appointment/:doctorId" 
        element={
          <ProtectedRoute>
            <BookingPage/>
          </ProtectedRoute>
        }
        />
        <Route path="/appointments" 
        element={
          <ProtectedRoute>
            <Appointments/>
          </ProtectedRoute>
        }
        />
        <Route path="/doctor-appointments" 
        element={
          <ProtectedRoute>
            <DoctorAppointments/>
          </ProtectedRoute>
        }
        />
        <Route path="/admin/doctors" 
        element={
          <ProtectedRoute>
            <Doctors/>
          </ProtectedRoute>
        }
        />
        <Route path="/notification" 
        element={
          <ProtectedRoute>
            <NotificationPage/>
          </ProtectedRoute>
        }
        />
        <Route path="/login"
        element={
        <PublicRoute>
        <Login/>
        </PublicRoute>
        }
        />
        <Route path="/register"
         element={
          <PublicRoute>
         <Register/>
          </PublicRoute>
         }/>
      </Routes>
      }
     </Router>
    </>
  );
}

export default App;
