import { useSelector } from "react-redux";
import { getAllTables } from '../../../redux/tablesRedux';
import { Link } from "react-router-dom";

const TableList = () => {

  const tables = useSelector(getAllTables);

  return(
    <div className="d-flex flex-column gap-3">
      {tables.map(table => (
        <div key={table.id} className="d-flex justify-content-between align-items-center py-3 border-bottom">
          <div className="gap-1 flex-grow-1 d-flex align-items-end">
            <h2 className="my-0 me-4">Table {table.id}</h2>
            <p className="my-0">Status: {table.status}</p>
          </div>
          <div>
            <Link key={table.id} to={`table/${table.id}`}>
              <button className="btn btn-primary">See more</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableList;