import { useSelector } from "react-redux";
import { getAllTables } from '../../../redux/tablesRedux';
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

const TableList = () => {

  const tables = useSelector(getAllTables);

  if(!tables.length){
    return (
      <div className="d-flex align-items-center justify-content-center py-3">
        <Spinner />
      </div>
    );
  };

  return(
    <div className="d-flex flex-column gap-3">
      {tables.map(table => (
        <div key={table.id} className="d-flex justify-content-between align-items-center py-3 border-bottom">
          <div className="gap-1 flex-grow-1 d-flex align-items-end">
            <h2 className="my-0 me-4">Table {table.id}</h2>
            <p className="my-0">Status: {table.status}</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Link key={table.id} to={`table/${table.id}`}>
              <Button>See more</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableList;