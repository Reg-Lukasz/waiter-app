const TableBill = ({ bill, setBill }) => {
  return(
    <div className="d-flex align-items-center pb-3">
      <strong className="pe-5">Bill:</strong>
      <span className="pe-2">$</span>
      <input name="table-bill" type="number" min="0" value={bill} className="form-control w-25" onChange={e => setBill(e.target.value)}></input>
    </div>
  );
};

export default TableBill;