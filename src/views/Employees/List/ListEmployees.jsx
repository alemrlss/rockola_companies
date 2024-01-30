import { useEffect, useState } from "react";
import api from "../../../api/api";

function ListEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      const response = await api.get("employee/employees/79");
      setEmployees(response.data.data);
    };

    getEmployees();
  }, []);

  return (
    <div>
      <p className="text-yellow-500 text-sm font-bold">
        Component in Construction
      </p>
      <h2 className="text-3xl font-bold">Employees</h2>

      <div className="flex flex-col">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="flex flex-row justify-around items-center bg-gray-200 rounded-md p-4 my-2 space-x-4"
          >
            <p className="text-lg font-bold">{employee.id}</p>
            <p className="text-lg font-bold">{employee.name}</p>
            <p className="text-lg font-bold">{employee.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListEmployees;
