
import Login from './pages/Login'

import { BrowserRouter, Route, Routes } from 'react-router'
import MainLayout from './layouts/MainLayout'
import Groups from './pages/groups/Groups'
import GroupEdit from './pages/groups/GroupEdit'
import GroupAdd from './pages/groups/GroupAdd'
import Employees from './pages/employees/Employees'
import EmployeesAdd from './pages/employees/EmployessAdd'
import EmployeesEdit from './pages/employees/EmployessEdit'
import TaskAdd from './pages/tasks/TasksAdd'
import TaskEdit from './pages/tasks/TaskEdit'
import Tasks from './pages/tasks/Tasks'
import TasksCreated from './pages/tasks/TasksCreated'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/signin" element={<Login />} />
          
          <Route path="groups" element={<MainLayout />}>
            <Route index element={<Groups />} />
            <Route path="add" element={<GroupAdd />} />
            <Route path=":id_group" element={<GroupEdit />} />
          </Route>

          <Route path="employees" element={<MainLayout />}>
            <Route index element={<Employees />} />
            <Route path="add" element={<EmployeesAdd />} />
            <Route path=":id_employee" element={<EmployeesEdit />} />
          </Route>

          <Route path="tasks" element={<MainLayout />}>
            <Route index element={<Tasks />} />
            <Route path="add" element={<TaskAdd />} />
            <Route path=":id_task" element={<TaskEdit />} />
            <Route path="created" element={<TasksCreated />} />
            
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
