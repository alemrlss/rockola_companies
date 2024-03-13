import { useEffect, useState } from "react";
import api from "../../../api/api";
import { jwtDecode } from "jwt-decode";

function ListEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const getEmployees = async () => {
          const response = await api.get(
            `employee/employees/${decodedToken.id}`
          );
          setEmployees(response.data.data);
        };

        getEmployees();
      } else {
        console.error("El token no está presente en el LocalStorage");
      }
    } catch (error) {
      console.error("Error al obtener las membresías:", error);
    }
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
