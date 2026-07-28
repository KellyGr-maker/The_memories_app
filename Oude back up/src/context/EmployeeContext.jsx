import { createContext, useContext, useState } from "react";

const EmployeeContext = createContext();

const defaultEmployees = [
  { id: 1, name: "Kelly" },
  { id: 2, name: "Stephanie" },
  { id: 3, name: "Shawny" },
  { id: 4, name: "Ann" },
];

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(defaultEmployees);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const addEmployee = (name) => {
    setEmployees((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
      },
    ]);
  };

  const updateEmployee = (id, name) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, name } : emp
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) =>
      prev.filter((emp) => emp.id !== id)
    );
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        currentEmployee,
        setCurrentEmployee,
        addEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployee() {
  return useContext(EmployeeContext);
}