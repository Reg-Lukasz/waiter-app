import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTables } from "./redux/tablesRedux";
import Home from "./components/pages/Home/Home";
import TableInfo from "./components/pages/TableInfo/TableInfo";
import NotFound from "./components/pages/NotFound/NotFound";
import Header from "./components/views/Header//Header";
import Footer from "./components/views/Footer/Footer";
import TableAdd from "./components/pages/TableAdd/TableAdd";
import Container from "react-bootstrap/Container";


function App() {

  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:tableId" element={<TableInfo />} />
          <Route path="/table/add" element={<TableAdd />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </>
  );
}

export default App;