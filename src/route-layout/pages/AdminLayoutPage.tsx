import ProtectedRoute from "../components/ProtectedRoute"

const AdminLayoutPage = () => {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]} />
  )
}

export default AdminLayoutPage
