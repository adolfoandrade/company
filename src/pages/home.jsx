import React, { Component } from "react";

export const REACT_APP_URL = "https://companyapp20231212003216.azurewebsites.net";

class Home extends Component {
  constructor(props) {
    super(props);
    this.onChangeDepartmentName = this.onChangeDepartmentName.bind(this);
    this.onChangeDepartmentDescription =
      this.onChangeDepartmentDescription.bind(this);
    this.saveDepartment = this.saveDepartment.bind(this);
    this.newDepartment = this.newDepartment.bind(this);

    this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
    this.onChangeEmployeeAge = this.onChangeEmployeeAge.bind(this);
    this.onChangeEmployeeJobTitle = this.onChangeEmployeeJobTitle.bind(this);
    this.onChangeEmployeeDepartmentId =
      this.onChangeEmployeeDepartmentId.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      employees: [],
      departments: [],
      id: null,
      departmentName: "",
      departmentDescription: "",
      employeeName: "",
      employeeAge: "",
      employeeJobTitle: "",
      employeeDepartmentId: "",
      published: false,
      submittedDepartment: false,
      submittedEmployee: false,
    };
  }

  fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem("token");
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    };
    return fetch(url, options);
  }

  componentDidMount() {
    this.fetchWithAuth(REACT_APP_URL + "/employees")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          employees: data,
        });
      }).catch((error) => {
        console.log(error);
      });

    this.fetchWithAuth(REACT_APP_URL  + "/departments")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          departments: data,
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  onChangeEmployeeName(e) {
    this.setState({
      employeeName: e.target.value,
    });
  }

  onChangeEmployeeAge(e) {
    this.setState({
      employeeAge: e.target.value,
    });
  }

  onChangeEmployeeJobTitle(e) {
    this.setState({
      employeeJobTitle: e.target.value,
    });
  }

  onChangeEmployeeDepartmentId(e) {
    this.setState({
      employeeDepartmentId: e.target.value,
    });
  }

  saveEmployee() {
    var data = {
      name: this.state.employeeName,
      age: this.state.employeeAge,
      jobTitle: this.state.employeeJobTitle,
      departmentId: this.state.employeeDepartmentId,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(data),
    };
    fetch(
      REACT_APP_URL + "/employees",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          submittedEmployee: true,
        });

        fetch(REACT_APP_URL + "/employees", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              employees: data,
            });
          });
      });
  }

  newEmployee() {
    this.setState({
      id: null,
      employeeName: "",
      employeeAge: "",
      employeeJobTitle: "",
      employeeDepartmentId: "",
      published: false,
      submittedEmployee: false,
    });
  }

  onChangeDepartmentName(e) {
    this.setState({
      departmentName: e.target.value,
    });
  }

  onChangeDepartmentDescription(e) {
    this.setState({
      departmentDescription: e.target.value,
    });
  }

  saveDepartment() {
    var data = {
      name: this.state.departmentName,
      description: this.state.departmentDescription,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(data),
    };
    fetch(
      REACT_APP_URL + "/departments",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          submittedDepartment: true,
        });

        fetch(REACT_APP_URL + "/departments", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              departments: data,
            });
          });
      });
  }

  newDepartment() {
    this.setState({
      id: null,
      departmentName: "",
      departmentDescription: "",
      published: false,
      submittedDepartment: false,
    });
  }

  render() {
    return (
      <>
        <div className="title padding-top">Employees</div>

        <div className="submit-form">
          {this.state.submittedEmployee ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newEmployee}>
                ADD MORE
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="employeeName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeName"
                  required
                  value={this.state.employeeName}
                  onChange={this.onChangeEmployeeName}
                  name="employeeName"
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  required
                  value={this.state.employeeAge}
                  onChange={this.onChangeEmployeeAge}
                  name="age"
                />
              </div>

              <div className="form-group">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="jobTitle"
                  required
                  value={this.state.employeeJobTitle}
                  onChange={this.onChangeEmployeeJobTitle}
                  name="jobTitle"
                />
              </div>

              <div className="form-group">
                <label htmlFor="departmentId">Department</label>
                <select
                  name="departmentId"
                  onChange={this.onChangeEmployeeDepartmentId}
                  id="departmentId"
                  required
                  className="form-control"
                >
                  {this.state.departments.map(function (department) {
                    return (
                      <option value={department.id}>{department.name}</option>
                    );
                  })}
                </select>
              </div>

              <button onClick={this.saveEmployee} className="btn btn-success">
                ADD EMPLOYEE
              </button>
            </div>
          )}
        </div>

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
            {this.state.employees?.map((value, index) => {
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

        <div className="title padding-top">Departments</div>

        <div className="submit-form">
          {this.state.submittedDepartment ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newDepartment}>
                ADD MORE
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Department Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.departmentName}
                  onChange={this.onChangeDepartmentName}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Department Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.departmentDescription}
                  onChange={this.onChangeDepartmentDescription}
                  name="description"
                />
              </div>

              <button onClick={this.saveDepartment} className="btn btn-success">
                ADD DEPARTMENT
              </button>
            </div>
          )}
        </div>

        <table className="padding-top">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.state.departments?.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.id}</td>
                  <td>{value.name}</td>
                  <td>{value.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default Home;
