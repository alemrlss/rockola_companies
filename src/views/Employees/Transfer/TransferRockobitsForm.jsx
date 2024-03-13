import  { useEffect, useState } from "react";
import api from "../../../api/api";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";


function TransferRockobitsForm() {
  const [employeeId, setEmployeeId] = useState("Select Employee");
  const [amount, setAmount] = useState("");
  const [transferResult, setTransferResult] = useState("");
  const [companyId, setCompanyId] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        setCompanyId(decodedToken.id);
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


  const handleTransfer = async () => {
    try {
      const body = {
        employee_id: employeeId,
        company_id: companyId,
        amount: parseInt(amount),
      };

      const response = await api.post(
        "rockobits/transferCompanyToEmployee",
        body
      );

      console.log(response);
      if (response.status === 201) {
        setTransferResult(`${amount} Rockobits transfered successfully`);
        setAmount("");
        setEmployeeId("Select Employee");
      } else {
        setTransferResult("Error transferring rockobits");
      }
    } catch (error) {
      console.error("Error al transferir rockobits:", error);
      setTransferResult("Error al transferir rockobits");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mt-8">Transfer Rockobits</h2>
      <form className="flex flex-col space-y-4">
        <Select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          label="Select Employee"
        >
          <MenuItem disabled value="">
            -- Select Employee --
          </MenuItem>
          {employees.map((employee) => (
            <MenuItem key={employee.id} value={employee.id}>
              {employee.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          type="number"
          label="Amount"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button variant="contained" onClick={handleTransfer}>
          Transfer Rockobits
        </Button>

        {transferResult && (
          <p
            className={
              transferResult.includes("Error")
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {transferResult}
          </p>
        )}
      </form>
    </div>
  );
}

export default TransferRockobitsForm;
