import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Button variant="contained" color="primary">Teste Página Inicial</Button>} />
      <Route path="*" element={<Navigate to='/' />} />
    </Routes>
  )
}

export default AppRoutes;