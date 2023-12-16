import React, { useState } from "react";
import "./App.css";
import Heading from "./components/Heading";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function App() {
  const blankUser = {
    name: "",
    email: "",
    designation: "",
    address: "",
  };

  const [user, setUser] = useState(blankUser);
  const [tableData, setTableData] = useState([]);
  const [action, setAction] = useState("Add");
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const addUser = () => {
    setTableData([...tableData, user]);
    setUser(blankUser);
    onCloseModal();
  };
  const editUser = (index) => {
    setAction("Edit");
    const selectedUser = tableData.find((value, i) => i === index);
    setUser(selectedUser);
    setEditIndex(index);
    onOpenModal();
  };
  const updateUser = () => {
    const update = tableData.map((value, i) => {
      if (i === editIndex) {
        value = user;
      }
      return value;
    });
    setTableData(update);
    setUser(blankUser);
    setEditIndex(null);
    onCloseModal();
  };

  const deleteUser = (index) => {
    const remainningUser = tableData.filter((value, i) => {
      return i != index;
    });
    setTableData(remainningUser);
  };

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction("Add");
  };
  return (
    <div className="container">
      <Heading />
      <button className="btn btn-primary" onClick={onOpenModal}>
        Add
      </button>
      <hr />
      <p>{JSON.stringify(tableData)}</p>
      <p>There are {tableData.length} employees in the company</p>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Designation</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 &&
            tableData.map((user, index) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.designation}</td>
                  <td>{user.address}</td>
                  <td>
                    <div className="actionButtons">
                      <button
                        className="btn btn-warning"
                        onClick={() => editUser(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUser(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Modal open={open} onClose={onCloseModal} center>
        <h4>{action} User</h4>
        <p>{JSON.stringify(user)}</p>
        <div className="form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={user.name}
            name="name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Enter name"
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            placeholder="Enter email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label htmlFor="Designation">Designation</label>
          <input
            type="text"
            name="designation"
            value={user.designation}
            onChange={(e) => setUser({ ...user, designation: e.target.value })}
            placeholder="Enter designation"
          />
          <label htmlFor="address">Adderss</label>
          <textarea
            name="address"
            col="20"
            rows="4"
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            placeholder="enter address"
          ></textarea>
        </div>
        {action === "Add" && (
          <button className="btn btn-primary" onClick={() => addUser()}>
            Submit
          </button>
        )}
        {action === "Edit" && (
          <button className="btn btn-success" onClick={() => updateUser()}>
            Update
          </button>
        )}
      </Modal>
    </div>
  );
}

export default App;
