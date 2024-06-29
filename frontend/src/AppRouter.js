import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Pages from './Pages';
import LoadingScreen from './LoadingScreen';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

function AppRouter() {
  const aC = useContext(AuthContext)
  return (
    <Router>
      {aC?.isLoggedIn ?  <Navbar/> : <LoadingScreen/>}
      <Pages/>
    </Router>
  )
}
export default AppRouter