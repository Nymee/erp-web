import ProtectedRoute from "../components/ProtectedRoute"

const UserLayoutPages = () => {
  return (
    <ProtectedRoute allowedRoles={["SAU", "SALES"]} />
  )
}

export default UserLayoutPages
