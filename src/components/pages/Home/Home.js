import { Link } from "react-router-dom";
import TableList from "../../features/TableList/TableList";
import Button from "react-bootstrap/Button";

const Home = () => {
  return(
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h1>All tables</h1>
        <Link to={'table/add'}>
          <Button variant="success">Add table +</Button>
        </Link>
      </div>
      <TableList />
    </>
  );
};

export default Home;