import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTableById } from "../../../redux/tablesRedux";
import { Container } from "react-bootstrap";

const TableInfo = () => {

  const { tableId } = useParams();

  const tableData = useSelector(state => getTableById(state, tableId));

  return(
    <div>
      <Container>
        <h1>Table {tableData.id}</h1>
        <div className="d-flex align-items-center py-3">
          <strong className="pe-4">Status:</strong>
          <select value={tableData.status} className="form-select w-25">
            <option value="Busy">Busy</option>
            <option value="Free">Free</option>
            <option value="Reserved">Reserved</option>
            <option value="Cleaning">Cleaning</option>
          </select>
        </div>
        <div className="d-flex align-items-center pb-3">
          <strong className="pe-4">People:</strong>
          <input type="number" value={tableData.peopleAmount} className="form-control w-25"></input>
          <span className="px-2">/</span>
          <input type="number" value={tableData.maxPeopleAmount} className="form-control w-25"></input>
        </div>
        <div className="d-flex align-items-center pb-3">
          <strong className="pe-5">Bill:</strong>
          <span className="pe-2">$</span>
          <input type="number" value={tableData.bill} className="form-control w-25"></input>
        </div>
        <div>
          <button className="btn btn-primary">Update</button>
        </div>
      </Container>
    </div>
  );
};

export default TableInfo;