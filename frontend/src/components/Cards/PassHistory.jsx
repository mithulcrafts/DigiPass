import "../styles/PassHistory.css";
import {ChevronHover,MapPinHover,CalendarIcon} from "../Animations.jsx";
export function StudentPassHistory({id,Purpose="Purpose",Status="Pending",FromDate="FromDate",ToDate="ToDate",Destination="Dest"}) {
  return (
    <>
      <div className="pass" id={id}>
        <h3 className="Purpose">{Purpose}</h3>
        <h4 className="Status">{Status}</h4>
        <p className="Date"style={{gridColumn:5}}><CalendarIcon/>{FromDate}</p>
        <p className="Date" style={{gridColumn:7}}><CalendarIcon/>{ToDate}</p>
        <p className="Destination"><MapPinHover/>{Destination}</p>
        <button className="viewPassArrow">
          <ChevronHover size={20} />
        </button>
      </div>
    </>
  );
}
export function WardenPassHistory() {
  return <>Pass history card in warden dashboard</>;
}
