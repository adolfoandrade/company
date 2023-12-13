import React, { useState, useEffect } from "react";
import ListEmployees from "../components/employees/list-employee.component"; // Import the missing component

export const REACT_APP_URL = "https://companyapp20231212003216.azurewebsites.net";

const Home2 = () => {
    return (
        <div>
            <ListEmployees />
        </div>
    );
};

export default Home2;