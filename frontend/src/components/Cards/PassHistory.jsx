import "../styles/PassHistory.css";
import {ChevronHover,MapPinHover,CalendarIcon} from "../Animations.jsx";
export function StudentPassHistory() {
  return (
    <>
      <div className="pass">
        <h3 className="Purpose">Purpose</h3>
        <h4 className="Status">Status</h4>
        <p className="Date"><CalendarIcon/>Date</p>
        <p className="Destination"><MapPinHover/>Destination</p>
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
