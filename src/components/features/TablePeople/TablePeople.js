const TablePeople = ({ peopleAmount, maxPeopleAmount, handlePeopleAmountChange, setMaxPeopleAmount }) => {
  return (
    <div className="d-flex align-items-center pb-3">
      <strong className="pe-4">People:</strong>
      <input name="table-people" type="number" min="0" max="10" value={peopleAmount} className="form-control w-25" onChange={e => handlePeopleAmountChange(parseInt(e.target.value, 10))}></input>
      <span className="px-2">/</span>
      <input name="table-max-people" type="number" min="0" max="10" value={maxPeopleAmount} className="form-control w-25" onChange={e => setMaxPeopleAmount(parseInt(e.target.value, 10))}></input>
    </div>
  );
};

export default TablePeople;