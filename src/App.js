import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Home from "./components/pages/Home/Home";
import TableInfo from "./components/pages/TableInfo/TableInfo";
import NotFound from "./components/pages/NotFound/NotFound";
import Header from "./components/views/Header//Header";
import Footer from "./components/views/Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTables } from "./redux/tablesRedux";

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
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </>
  );
}

export default App;