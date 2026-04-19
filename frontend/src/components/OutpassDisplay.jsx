import "./styles/OutpassDisplay.css";
import { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import getOutpasses from "../utils/getOutpasses.js";
import { getUserById } from "../utils/getUser.js";
import { getStudentById } from "../utils/getStudent.js";
import { ReadOnlyForm } from "./FormInput";
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Button from "./Button.jsx";
import { handleAction } from "../utils/handleAction.js";
const baseURL = import.meta.env.VITE_API_BASE_URL;
import QRCode from "qrcode";
export default function OutpassDisplay() {
  const { id } = useParams();
  const { token } = useParams();
  const [outpass, setOutpass] = useState({});
  const [user, setUser] = useState({});
  const [student, setStudent] = useState({});
  const [downloading, setDownloading] = useState(false);
  const [qr, setQr] = useState("");
  const [approved, setApproved] = useState(false);
  const [warden, setWarden] = useState({});
  const [eventTime, setEventTime] = useState({});
  const [error, setError] = useState("");
  const role = localStorage.getItem("role");
  const hasFetched = useRef(false);
  async function fetchData() {
    try {
      let res;
      let data;
      if (role === "guard") {
        res = await getOutpasses(`/outpass/verify/${token}`);
        data = res.data.outpass;
        if (
          res.data.message == "EXIT recorded" ||
          res.data.message == "ENTRY recorded"
        ) {
          setApproved(true);
          const wardenData = await getUserById(data?.eventBy);
          setWarden(wardenData);
          if (data?.eventTime) {
            const ET = new Date(data.eventTime).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            setEventTime(ET);
          }
        }
      } else {
        res = await getOutpasses(`/outpass/getOutpass/${id}`);
        data = res.data;
      }
      setOutpass(data);
      const user = await getUserById(data?.requestedBy);
      setUser(user);
      const student = await getStudentById(data?.requestedBy);
      setStudent(student);
      if (role !== "guard") {
        const token = data?.qrToken;
        if (token) {
          const url = `${baseURL}/outpass/verify/${token}`;
          QRCode.toDataURL(url).then(setQr);
        }
      } else {
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  }
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchData();
  }, [id, token]);
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
          {role !== "guard" && outpass.status === "Approved" && (
            <div className="qrWrapper">
              {qr ? (
                <img className="QRCode" src={qr} alt="QR Code" />
              ) : (
                <p>Generating QR...</p>
              )}
            </div>
          )}
          {role === "guard" && (
            <>
              {approved ? (
                <>
                  <div className="FormRowHorizontal">
                    <div className="FormRow">
                      <ReadOnlyForm
                        id="approvedBy"
                        name="Approved By"
                        value={warden?.name || ""}
                      />
                    </div>

                    <div className="FormRow">
                      <ReadOnlyForm
                        id="approvedAt"
                        name="Approved At"
                        value={eventTime || ""}
                      />
                    </div>
                  </div>
                  <div className="verifyStatus success">
                    <div className="statusIcon">✔</div>
                    <h2>Valid Outpass</h2>
                  </div>
                </>
              ) : (
                <div className="verifyStatus error">
                  <div className="statusIcon">✖</div>
                  <h2>{error || "Invalid Outpass"}</h2>
                </div>
              )}
            </>
          )}

          {!downloading && (
            <div className="ButtonRow">
              {role === "warden" && (
                <div className="outpassActionButtons">
                  <button
                    type="button"
                    className="approveBtn"
                    onClick={async () => {
                      const updated = await handleAction(id, "Approved");
                      setOutpass(updated);
                    }}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="rejectBtn"
                    onClick={async () => {
                      const updated = await handleAction(id, "Rejected");
                      setOutpass(updated);
                    }}
                  >
                    Reject
                  </button>
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
