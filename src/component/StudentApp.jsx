import React, { useState } from 'react';
import { useStudentState, useStudentDispatch } from './StudentContext';
import '../App.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const StudentApp = () => {
  const { students } = useStudentState();
  const dispatch = useStudentDispatch();
  const [editId, setEditId] = useState(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editGroup, setEditGroup] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (id, firstName, lastName, group) => {
    setEditId(id);
    setEditFirstName(firstName);
    setEditLastName(lastName);
    setEditGroup(group);
    setShowModal(true);
  };

  const handleSave = () => {
    // Example: You can perform an API call here to update the student data
    // For demonstration purposes, we'll just log the updated data
    console.log(`Updated data for student ${editId}: First Name - ${editFirstName}, Last Name - ${editLastName}, Group - ${editGroup}`);

    // Update the student in the context or dispatch an action to update elsewhere
    const updatedStudents = students.map(student => {
      if (student.id === editId) {
        return {
          ...student,
          name: `${editFirstName} ${editLastName}`,
          username: editGroup
        };
      }
      return student;
    });

    // Dispatch an action to update students in the context
    dispatch({ type: 'UPDATE_STUDENTS', payload: updatedStudents });

    // Clear edit state and close modal
    setEditId(null);
    setEditFirstName('');
    setEditLastName('');
    setEditGroup('');
    setShowModal(false);
  };

  const handleCancel = () => {
    // Clear edit state and close modal
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
    <div>
      <h1>Student List</h1>
      <table>
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
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.id === editId ? (
                <Form.Control
                  type="text"
                  value={editFirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                />
              ) : student.name.split(' ')[0]}</td>
              <td>{student.id === editId ? (
                <Form.Control
                  type="text"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                />
              ) : student.name.split(' ')[1]}</td>
              <td>{student.id === editId ? (
                <Form.Control
                  type="text"
                  value={editGroup}
                  onChange={(e) => setEditGroup(e.target.value)}
                />
              ) : student.username}</td>
              <td>
                {student.id === editId ? (
                  <React.Fragment>
                    <Button variant="success" onClick={handleSave}>Save</Button>
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Button variant="primary" onClick={() => handleEdit(student.id, student.name.split(' ')[0], student.name.split(' ')[1], student.username)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(student.id)}>Delete</Button>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
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
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StudentApp;
