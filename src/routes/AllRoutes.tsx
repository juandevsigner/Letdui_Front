import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { Login, Register, NewPass, RecoverPass, Confirm } from "../auth/pages";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="recover-pass" element={<RecoverPass />} />
          <Route path="recover-pass/:token" element={<NewPass />} />
          <Route path="confirm/:id" element={<Confirm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
