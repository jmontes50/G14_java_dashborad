import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = (props) => {
  const { token } = useAuthStore();
  console.log("token en ProtectedRoute", token);

  //en el caso de si el token existe retornamos lo que llegue como children
  //si no, con Navigate redirijimos a login, replace sirve para reemplazar la ruta en el historial
  return token ? <>{props.children}</> : <Navigate to="/login" replace />
}

export default ProtectedRoute;