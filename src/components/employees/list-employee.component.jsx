import React, { useState, useEffect } from "react";
import api from "../../api";

const ListEmployees = () => {
  const [state, setState] = useState({
    employees: [],
  });

  useEffect(() => {
    api
      .get("/employees")
      .then((response) => response.json())
      .then((data) => {
        setState((prevState) => ({ ...prevState, employees: data }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <table className="padding-top">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Job Title</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {state.employees?.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.age}</td>
                <td>{value.jobTitle}</td>
                <td>{value.department?.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployees;
