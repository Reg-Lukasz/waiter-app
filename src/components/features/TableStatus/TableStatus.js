const TableStatus = ({ status, handleStatusChange }) => {
  return (
    <div className="d-flex align-items-center py-3">
      <strong className="pe-4">Status:</strong>
      <select name="table-status" value={status} className="form-select w-25" onChange={e => handleStatusChange(e.target.value)}>
        <option value="Free">Free</option>
        <option value="Reserved">Reserved</option>
        <option value="Busy">Busy</option>
        <option value="Cleaning">Cleaning</option>
      </select>
    </div>
  );
};

export default TableStatus;