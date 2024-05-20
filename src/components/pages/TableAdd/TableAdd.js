import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTableRequest, getAllTables } from '../../../redux/tablesRedux';
import { useDispatch, useSelector } from "react-redux";
import TableStatus from "../../features/TableStatus/TableStatus";
import TablePeople from "../../features/TablePeople/TablePeople";
import TableBill from "../../features/TableBill/TableBill";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const TableAdd = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tables = useSelector(getAllTables);

  const [newTableId, setNewTableId] = useState();
  const [newTableStatus, setNewTableStatus] = useState('Free');
  const [newTablePeopleAmount, setNewTablePeopleAmount] = useState(0)
  const [newTableMaxPeopleAmount, setNewTableMaxPeopleAmount] = useState(0);
  const [newTableBill, setNewTableBill] = useState(0);

  //warunek, który ustawia poepleAmount o wartości maxPeopleAmount, gdy maxPeopleAmount < peopleAmount
  useEffect(() => {
    if(newTablePeopleAmount > newTableMaxPeopleAmount) setNewTablePeopleAmount(newTableMaxPeopleAmount)
  }, [newTablePeopleAmount, newTableMaxPeopleAmount]);

  //ustawia pierwszą możliwą opcję dla setTableId
  useEffect(() => {
    if(tables.length > 0){
      const maxId = tables.reduce((max, table) => Math.max(max, table.id), 0);
      setNewTableId(maxId + 1);
    };
  }, [tables]);

  //warunek który automatycznie ustawia wartości w polach peopleAmount oraz maxPeopleAmount przy zmianie statusu na 'Free' lub 'Cleaning'
  const handleStatusChange = (value) => {
    setNewTableStatus(value);
    if(value === "Free" || value === "Cleaning"){
      setNewTablePeopleAmount(0);
      setNewTableMaxPeopleAmount(0);
    };
  };

  //warunek ustawiający, aby peopleAmount nie mogło być większe od maxPeopleAmount
  const handlePeopleAmountChange = (value) => {
    if(value <= newTableMaxPeopleAmount){
      setNewTablePeopleAmount(value);
    };
  };

  const handleAddTable = e => {
    e.preventDefault();
    const newTable = {
      id: newTableId.toString(),
      status: newTableStatus,
      peopleAmount: newTablePeopleAmount,
      maxPeopleAmount: newTableMaxPeopleAmount,
      bill: newTableStatus !== 'Busy' ? 0 : newTableBill,
    };
    if(tables.some(table => table.id === newTable.id)){
      alert(`TABLE ${newTable.id} ALREADY EXISTS!`);
    } else if(newTableId === undefined){
      alert('SET NEW TABLE NUMBER!')
    } else{
      dispatch(addTableRequest(newTable, navigate));
    };
  };

  return(
    <div>
      <Container>
        <h1>Add new table</h1>
        <div className="d-flex align-items-center">
          <strong className="pe-4">Table number:</strong>
          <input name="table-id" type="number" min="1" max="10" value={newTableId} onChange={e => setNewTableId(e.target.value)} className="form-select w-25"></input>
        </div>
        <TableStatus status={newTableStatus} handleStatusChange={handleStatusChange} />
        <TablePeople peopleAmount={newTablePeopleAmount} maxPeopleAmount={newTableMaxPeopleAmount} handlePeopleAmountChange={handlePeopleAmountChange} setMaxPeopleAmount={setNewTableMaxPeopleAmount} />
        {newTableStatus === "Busy" && (
        <TableBill bill={newTableBill} setBill={setNewTableBill} />
        )}
        <Button variant="success" onClick={handleAddTable}>Add</Button>
      </Container>
    </div>
  );
};

export default TableAdd;