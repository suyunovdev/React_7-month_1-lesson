import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

const StudentStateContext = createContext();
const StudentDispatchContext = createContext();

const initialState = {
  students: [],
};

const studentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STUDENTS':
      return { ...state, students: action.payload };
    case 'DELETE_STUDENT':
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload)
      };
    default:
      return state;
  }
};

export const StudentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        dispatch({ type: 'SET_STUDENTS', payload: response.data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <StudentStateContext.Provider value={state}>
      <StudentDispatchContext.Provider value={dispatch}>
        {children}
      </StudentDispatchContext.Provider>
    </StudentStateContext.Provider>
  );
};

export const useStudentState = () => {
  const context = useContext(StudentStateContext);
  if (context === undefined) {
    throw new Error('useStudentState must be used within a StudentProvider');
  }
  return context;
};

export const useStudentDispatch = () => {
  const context = useContext(StudentDispatchContext);
  if (context === undefined) {
    throw new Error('useStudentDispatch must be used within a StudentProvider');
  }
  return context;
};
