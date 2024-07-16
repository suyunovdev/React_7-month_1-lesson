import React, { useState } from 'react';
import { useStudentState, useStudentDispatch } from './StudentContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StudentApp.css';

const StudentApp = () => {
  const { students } = useStudentState();
  const dispatch = useStudentDispatch();
  const [editId, setEditId] = useState(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editGroup, setEditGroup] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (id, firstName, lastName, group) => {
    setEditId(id);
    setEditFirstName(firstName);
    setEditLastName(lastName);
    setEditGroup(group);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditId(null);
    setEditFirstName('');
    setEditLastName('');
    setEditGroup('');
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSave = () => {
    const updatedStudent = {
      id: isEditing ? editId : Date.now(), // Use current timestamp as ID for new students
      firstname: editFirstName,
      lastname: editLastName,
      group: editGroup,
    };

    if (isEditing) {
      dispatch({ type: 'UPDATE_STUDENT', payload: updatedStudent });
    } else {
      dispatch({ type: 'ADD_STUDENT', payload: updatedStudent });
    }

    setEditId(null);
    setEditFirstName('');
    setEditLastName('');
    setEditGroup('');
    setShowModal(false);
  };

  const handleCancel = () => {
    setEditId(null);
    setEditFirstName('');
    setEditLastName('');
    setEditGroup('');
    setShowModal(false);
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_STUDENT', payload: id });
  };

  return (
    <div className="App">
      <h1 className="text-center">Student List</h1>
      <Button variant="success" onClick={handleAdd} style={{ marginBottom: '20px' }}>Add Student</Button>
      <table className="tabless table table-striped table-bordered table-hover table-responsive-sm" >
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Group</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(students) && students.length > 0 ? (
            students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstname}</td>
                <td>{student.lastname}</td>
                <td>{student.group}</td>
                <td className='buttonss'>
                  <Button variant="primary" onClick={() => handleEdit(student.id, student.firstname, student.lastname, student.group)}>✍️</Button>
                  <Button variant="danger" onClick={() => handleDelete(student.id)}>🗑️</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No students available</td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Student' : 'Add Student'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={editFirstName}
              onChange={(e) => setEditFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={editLastName}
              onChange={(e) => setEditLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroup">
            <Form.Label>Group</Form.Label>
            <Form.Control
              type="text"
              value={editGroup}
              onChange={(e) => setEditGroup(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            ⛔
          </Button>
          <Button variant="primary" onClick={handleSave}>
            ✅
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentApp;
