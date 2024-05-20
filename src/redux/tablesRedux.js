import { API_URL } from '../config.js'

//selectors
export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const DELETE_TABLE = createActionName('DELETE_TABLE');
const ADD_TABLE = createActionName('ADD_TABLE');
const FETCH_TABLE_SUCCESS = createActionName('FETCH_TABLE_SUCCESS');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload });
export const deleteTable = payload => ({ tpye: DELETE_TABLE, payload });
export const addTable = payload => ({ type: ADD_TABLE, payload });
export const fetchTableSuccess = payload => ({ type: FETCH_TABLE_SUCCESS, payload });
export const fetchTables = () => {
  return (dispatch) => {
    fetch(`${API_URL}/tables`)
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)))
  }
};
export const fetchTableById = (id) => async dispatch => {
    const response = await fetch(`${API_URL}/tables/${id}`);
    const data = await response.json();
    dispatch(fetchTableSuccess(data));
};
export const editTableRequest = ( editedTable, navigate ) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedTable),
    };
    fetch(`${API_URL}/tables/${editedTable.id}`, options)
      .then(() => { dispatch(editTable(editedTable.id)) })
      navigate('/');
  }
};
export const deleteTableRequest = ( id, navigate ) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(`${API_URL}/tables/${id}`, options)
      .then(() => {dispatch(editTable(deleteTable(id)))})
      navigate('/');
  };
};
export const addTableRequest = ( newTable, navigate ) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTable)
    };
    fetch(`${API_URL}/tables/`, options)
      .then(() => { dispatch(addTable(newTable))})
      navigate('/');
  }
};


const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case FETCH_TABLE_SUCCESS:
      return statePart
    case UPDATE_TABLES:
      return action.payload
    case EDIT_TABLE:
      return statePart.map(table => table.id === action.payload.id ? { ...table, ...action.payload } : table)
    case DELETE_TABLE:
      return statePart.filter(table => table.id !== action.payload)
    case ADD_TABLE:
      return [ ...statePart, action.payload ]
    default:
      return statePart;
  };
};
export default tablesReducer;