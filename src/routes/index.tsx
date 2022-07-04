import { Routes, Route, Navigate } from "react-router-dom";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<p>Teste Página Inicial</p>} />
      <Route path="*" element={<Navigate to='/' />} />
    </Routes>
  )
}

export default AppRoutes;