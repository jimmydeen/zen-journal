import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
export function UserPage() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}
export default UserPage