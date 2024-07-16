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
    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id ? action.payload : student
        )
      };
    case 'ADD_STUDENT':
      return {
        ...state,
        students: [action.payload, ...state.students]
      };
    default:
      return state;
  }
};

export const StudentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/student');
        console.log('Fetched data:', response.data);
        dispatch({ type: 'SET_STUDENTS', payload: response.data });
      } catch (error) {
        console.error('Error fetching data:', error);
        console.log('Axios config:', error.config);
        console.log('Axios request:', error.request);
      }
    };

    fetchData();
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
