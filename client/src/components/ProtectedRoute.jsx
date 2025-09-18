import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext";

export default function ProtectedRoute() {
  const { isLoggedIn, loading } = useSession();
  console.log("The logged is user is: ", isLoggedIn);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
