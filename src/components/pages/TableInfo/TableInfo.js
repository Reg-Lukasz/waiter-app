import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editTableRequest, getTableById } from "../../../redux/tablesRedux";
import { useState } from "react";
import Container from "react-bootstrap/Container";

const TableInfo = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tableId } = useParams();

  const tableData = useSelector(state => getTableById(state, tableId));

  const [status, setStatus] = useState(tableData.status);
  const [peopleAmount, setPeopleAmount] = useState(tableData.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(tableData.maxPeopleAmount);
  const [bill, setBill] = useState(tableData.bill);

  const handleEditTable = e => {
    e.preventDefault();
    const editedTable = {
      id: tableId,
      status: status,
      peopleAmount: peopleAmount,
      maxPeopleAmount: maxPeopleAmount,
      bill: bill
    };
    if(status !== "Busy"){
      editedTable.bill = 0;
    };
    if(status === "Free" || status === "Cleaning"){
      editedTable.peopleAmount = 0;
      editedTable.maxPeopleAmount = 0;
    };
    dispatch(editTableRequest(editedTable, navigate));
  };

  if(peopleAmount > maxPeopleAmount) setPeopleAmount(maxPeopleAmount);

  if (!tableData) return navigate('/');

  if(status !== 'Busy'){
    return(
      <div>
      <Container>
        <h1>Table {tableData.id}</h1>
        <div className="d-flex align-items-center py-3">
          <strong className="pe-4">Status:</strong>
          <select value={status} className="form-select w-25" onChange={e => setStatus(e.target.value)}>
            <option value="Busy">Busy</option>
            <option value="Free">Free</option>
            <option value="Reserved">Reserved</option>
            <option value="Cleaning">Cleaning</option>
          </select>
        </div>
        <div className="d-flex align-items-center pb-3">
          <strong className="pe-4">People:</strong>
          <input type="number" min="0" max="10" value={peopleAmount} className="form-control w-25" onChange={e => setPeopleAmount(e.target.value)}></input>
          <span className="px-2">/</span>
          <input type="number" min="0" max="10" value={maxPeopleAmount} className="form-control w-25" onChange={e => setMaxPeopleAmount(e.target.value)}></input>
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleEditTable}>Update</button>
        </div>
      </Container>
    </div>
    );
  };

  return(
    <div>
      <Container>
        <h1>Table {tableData.id}</h1>
        <div className="d-flex align-items-center py-3">
          <strong className="pe-4">Status:</strong>
          <select value={status} className="form-select w-25" onChange={e => setStatus(e.target.value)}>
            <option value="Busy">Busy</option>
            <option value="Free">Free</option>
            <option value="Reserved">Reserved</option>
            <option value="Cleaning">Cleaning</option>
          </select>
        </div>
        <div className="d-flex align-items-center pb-3">
          <strong className="pe-4">People:</strong>
          <input type="number" min="0" max="10" value={peopleAmount} className="form-control w-25" onChange={e => setPeopleAmount(e.target.value)}></input>
          <span className="px-2">/</span>
          <input type="number" min="0" max="10" value={maxPeopleAmount} className="form-control w-25" onChange={e => setMaxPeopleAmount(e.target.value)}></input>
        </div>
        <div className="d-flex align-items-center pb-3">
          <strong className="pe-5">Bill:</strong>
          <span className="pe-2">$</span>
          <input type="number" min="0" value={bill} className="form-control w-25" onChange={e => setBill(e.target.value)}></input>
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleEditTable}>Update</button>
        </div>
      </Container>
    </div>
  );
};

export default TableInfo;