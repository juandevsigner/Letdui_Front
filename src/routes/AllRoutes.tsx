import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout, PrivateRoutes } from "../layouts";
import { Login, Register, NewPass, RecoverPass, Confirm } from "../auth";
import { Projects, NewProject, Project, EditProject } from "../dashboard";
import { AuthProvider, ProjectsProvider } from "../context";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="recover-pass" element={<RecoverPass />} />
              <Route path="recover-pass/:token" element={<NewPass />} />
              <Route path="confirm/:id" element={<Confirm />} />
            </Route>

            <Route path="/projects" element={<PrivateRoutes />}>
              <Route index element={<Projects />} />
              <Route path=":id" element={<Project />} />
              <Route path="edit/:id" element={<EditProject />} />
              <Route path="new-project" element={<NewProject />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AllRoutes;
