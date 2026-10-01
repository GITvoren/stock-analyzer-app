import "./Spinner.css";

function Spinner() {
  return (
    <div className="spinner" role="status" aria-label="Loading">
      <span className="spinner__circle" />
    </div>
  );
}

export default Spinner;