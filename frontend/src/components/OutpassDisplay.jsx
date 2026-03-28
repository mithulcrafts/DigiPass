import "./styles/OutpassDisplay.css";
import { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import getOutpasses from "../utils/getOutpasses.js";
import { getUserById } from "../utils/getUser.js";
import { getStudentById } from "../utils/getStudent.js";
import { ReadOnlyForm } from "./FormInput";
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Button from "./Button.jsx";
export default function OutpassDisplay() {
  const { id } = useParams();
  const [outpass, setOutpass] = useState({});
  const [user, setUser] = useState({});
  const [student, setStudent] = useState({});
  const [downloading, setDownloading] = useState(false);
  const role = localStorage.getItem("role");
  async function fetchData() {
    try {
      const res = await getOutpasses(`/outpass/getOutpass/${id}`);
      setOutpass(res.data);
      console.log(res.data);
      const user = await getUserById(res?.data?.requestedBy);
      setUser(user);
      console.log(user);
      const student = await getStudentById(res?.data.requestedBy);
      setStudent(student);
      console.log(student);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, [id]);
  const fromDate = new Date(outpass?.fromTime || "");
  const toDate = new Date(outpass?.toTime || "");
  const fDate = fromDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const tDate = toDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const handleDownload = async (e) => {
    e.preventDefault();
    setDownloading(true);
    await new Promise((r) => setTimeout(r, 100));
    const element = document.getElementById("outpass-card");
    html2pdf().from(element).save("Outpass.pdf");
    setDownloading(false);
  };
  return (
    <>
      <Header />
      <div className="OutpassContainer" id="outpass-card">
        <form className="FormGrid">
          <div className={`StatusBadge ${outpass?.status}`}>
            {outpass?.status || "Pending"}
          </div>
          <div className="FormRow">
            <ReadOnlyForm id="name" name="Name" value={user?.name || ""} />
          </div>

          <div className="FormRow">
            <ReadOnlyForm
              id="rollNum"
              name="Roll Number"
              value={student?.rollNumber || ""}
            />
          </div>

          <div className="FormRow">
            <ReadOnlyForm id="email" name="Email" value={user?.email || ""} />
          </div>

          <div className="FormRow">
            <ReadOnlyForm
              id="branch"
              name="Branch"
              value={student?.branch || ""}
            />
          </div>

          <div className="FormRow">
            <ReadOnlyForm
              id="phNum"
              name="Phone Number"
              value={user?.phoneNumber || ""}
            />
          </div>

          <div className="FormRow">
            <ReadOnlyForm
              id="hostel"
              name="Hostel"
              value={student?.hostel || ""}
            />
          </div>

          <div className="FormRow">
            <ReadOnlyForm
              id="roomNumber"
              name="Room Number"
              value={student?.roomNumber || ""}
            />
          </div>

          <div className="FormRowSpacer" />
          <div className="FormRow">
            <ReadOnlyForm
              id="location"
              name="Location"
              value={outpass?.location || ""}
            />
          </div>

          <div className="FormRow">
            <ReadOnlyForm
              id="purpose"
              name="Purpose"
              value={outpass?.purpose || ""}
            />
          </div>

          <div className="FormRow">
            <ReadOnlyForm id="fromTime" name="From" value={fDate || ""} />
          </div>

          <div className="FormRow">
            <ReadOnlyForm id="toTime" name="To" value={tDate || ""} />
          </div>
          {!downloading && (
            <div className="ButtonRow">
              {role === "warden" && (
                <div className="outpassActionButtons">
                  <button type="button" className="approveBtn">Approve</button>
                  <button type="button" className="rejectBtn">Reject</button>
                </div>
              )}
              <Button
                content="Download"
                onClick={handleDownload}
                type="button"
              />
            </div>
          )}
        </form>
      </div>
    </>
  );
}
