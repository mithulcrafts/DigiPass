import "../styles/PassHistory.css";
import {useState} from "react"
import { ChevronHover, MapPinHover, CalendarIcon } from "../Animations.jsx";
import { useNavigate } from "react-router-dom";
import { handleAction } from "../../utils/handleAction.js";
export function StudentPassHistory({
  id,
  Purpose = "Purpose",
  Status = "Pending",
  FromDate = "FromDate",
  ToDate = "ToDate",
  Destination = "Dest",
}) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/Outpass/${id}`);
  };
  return (
    <>
      <div className="pass" id={id}>
        <h3 className="Purpose">{Purpose}</h3>
        <h4 className={`StatusBadge ${Status}`}>{Status}</h4>
        <p className="Date" style={{ gridColumn: 5 }}>
          <CalendarIcon />
          {FromDate}
        </p>
        <p className="Date" style={{ gridColumn: 7 }}>
          <CalendarIcon />
          {ToDate}
        </p>
        <p className="Destination">
          <MapPinHover />
          {Destination}
        </p>
        <button className="viewPassArrow" onClick={handleNavigate}>
          <ChevronHover size={20} />
        </button>
      </div>
    </>
  );
}
export function WardenPassHistory({
  id,
  Purpose = "Purpose",
  Status = "Pending",
  FromDate = "FromDate",
  ToDate = "ToDate",
  Destination = "Dest",
}) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/Outpass/${id}`);
  };
  const [status, setStatus] = useState(Status);
  return (
    <>
      <div className="Wardenpass" id={id}>
        <h3 className="Purpose">{Purpose}</h3>
        <h4 className={`StatusBadge ${status}`}>{status}</h4>
        <p className="Date" style={{ gridColumn: 5 }}>
          <CalendarIcon />
          {FromDate}
        </p>
        <p className="Date" style={{ gridColumn: 7 }}>
          <CalendarIcon />
          {ToDate}
        </p>
        <p className="WardenDestination">
          <MapPinHover />
          {Destination}
        </p>
        <div className="actionButtons">
          <button
            className="approveBtn"
            onClick={async () => {
              await handleAction(id, "Approved");
              setStatus("Approved")
            }}
            >
            Approve
          </button>
          <button
            className="rejectBtn"
            onClick={async () => {
              await handleAction(id, "Rejected");
              setStatus("Rejected")
            }}
          >
            Reject
          </button>
        </div>
        <button className="viewPassArrow" onClick={handleNavigate}>
          <ChevronHover size={20} />
        </button>
      </div>
    </>
  );
}
