import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Pages from './Pages';
import Landing from './Landing';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

function AppRouter() {
  const aC = useContext(AuthContext)
  return (
    <Router>
      {aC?.isLoggedIn ?  <Navbar/> : <Landing></Landing>}
      <Pages/>
    </Router>
  )
}
export default AppRouter