import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  console.log('in protected Route')
  const loginToken = Cookies.get('login_token')
  return loginToken ? children : <Navigate to='/login' replace />
}

export default ProtectedRoute
