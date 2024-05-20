import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editTableRequest, fetchTableById, getTableById } from "../../../redux/tablesRedux";
import TableStatus from "../../features/TableStatus/TableStatus";
import TableBill from "../../features/TableBill/TableBill";
import TablePeople from "../../features/TablePeople/TablePeople";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

const TableInfo = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tableId } = useParams();

  const tableData = useSelector(state => getTableById(state, tableId));

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(0);
  const [bill, setBill] = useState(0);

  //asynchroniczna funkcja pobierająca dane oraz ustawiająca setLoading
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchTableById(tableId));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, tableId]);

  //warunek ustawiający początkowe wartości, gdy dane istnieją
  useEffect(() => {
    if(tableData){
      setStatus(tableData.status);
      setPeopleAmount(tableData.peopleAmount);
      setMaxPeopleAmount(tableData.maxPeopleAmount);
      setBill(tableData.bill);
    }
  }, [tableData]);

  const handleEditTable = e => {
    e.preventDefault();
    const editedTable = {
      id: tableId,
      status: status,
      peopleAmount: peopleAmount,
      maxPeopleAmount: maxPeopleAmount,
      bill: status !== "Busy" ? 0 : bill
    };
    if(status === "Free" || status === "Cleaning"){
      editedTable.peopleAmount = 0;
      editedTable.maxPeopleAmount = 0;
    };
    dispatch(editTableRequest(editedTable, navigate));
  };

  //warunek, który ustawia poepleAmount o wartości maxPeopleAmount, gdy maxPeopleAmount < peopleAmount
  useEffect(() => {
    if(peopleAmount > maxPeopleAmount) setPeopleAmount(maxPeopleAmount)
  }, [peopleAmount, maxPeopleAmount]);

  //warunek który automatycznie ustawia wartości w polach peopleAmount oraz maxPeopleAmount przy zmianie statusu na 'Free' lub 'Cleaning'
  const handleStatusChange = (value) => {
    setStatus(value);
    if(value === "Free" || value === "Cleaning"){
      setPeopleAmount(0);
      setMaxPeopleAmount(0);
    };
  };

  //warunek ustawiający, aby peopleAmount nie mogło być większe od maxPeopleAmount
  const handlePeopleAmountChange = (value) => {
    if(value <= maxPeopleAmount){
      setPeopleAmount(value);
    };
  };

  //warunek, jeżeli nie istnieje stolik, nawiguje nas na strone główną
  if(!tableData && !loading) return <Navigate to="/" />;

  //warunek włączający spinner, gdy status loading = true
  if(loading) return (
    <div className="d-flex align-items-center justify-content-center py-3">
      <Spinner />
    </div>
  );

  return(
    <div>
      <Container>
        <h1>Table {tableData.id}</h1>
        <TableStatus status={status} handleStatusChange={handleStatusChange} />
        <TablePeople peopleAmount={peopleAmount} maxPeopleAmount={maxPeopleAmount} handlePeopleAmountChange={handlePeopleAmountChange} setMaxPeopleAmount={setMaxPeopleAmount} />
        {status === "Busy" && (
        <TableBill bill={bill} setBill={setBill} />
        )}
        <div>
          <Button onClick={handleEditTable}>Update</Button>
        </div>
      </Container>
    </div>
  );
};

export default TableInfo;