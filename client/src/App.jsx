import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import Ticket from "./pages/dashboard/Ticket";
import Invoice from "./pages/dashboard/Invoice";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/ticket/:id" element={<Ticket/>} />
      <Route path="/invoice/:id" element={<Invoice />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
