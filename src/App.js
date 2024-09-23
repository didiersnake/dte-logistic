
import { UserAuth } from "./context/AuthContext";
import NonUserRoutes from "./routes/NonUserRoutes";
import UserRoutes from "./routes/UserRoutes";
import { globalConstants } from "./constants/global";
import AdminRoutes from "./routes/AdminRoutes";
function App() {
  const { isLoggedOut, user } = UserAuth();
    let isAdmin = user?.role === globalConstants.userRole[0]
    const Content = () => {
      if(isLoggedOut){
        return(<NonUserRoutes isLoggedOut={isLoggedOut} user={user}/>)
      }else if(isAdmin){
        return(<AdminRoutes/>)
      }else{
        return <UserRoutes isLoggedOut={isLoggedOut} user={user} />;
      }
    }
    
  return <div>{<Content/>}</div>;
}

export default App; 
