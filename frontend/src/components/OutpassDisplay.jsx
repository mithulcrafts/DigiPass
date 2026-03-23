import "./styles/OutpassDisplay.css";
import { useState, useEffect } from "react";
import getOutpasses from "../utils/getOutpasses.js";
import { getUserById } from "../utils/getUser.js";
import { getStudentById } from "../utils/getStudent.js";
import { ReadOnlyForm } from "./FormInput";
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
export default function OutpassDisplay() {
  const { id } = useParams();
  const [outpass, setOutpass] = useState({});
  const [user, setUser] = useState({});
  const [student, setStudent] = useState({});
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
  return (
    <>
      <Header/>
      <div className="OutpassContainer">
        <form className="FormGrid">
          <div className="StatusBadge">{outpass?.status || "Pending"}</div>
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
          {/* Ig the issue occured because previously id=location, we were taking location input, but currently we are showing it in read only, thats why */}
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
        </form>
      </div>
    </>
  );
}
