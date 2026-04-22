import "./styles/Outpass.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReadOnlyForm, FormInput } from "../../components/FormInput";
import fetchData from "../../utils/fetchData";
import Button from "../../components/Button";
import Header from "../../components/Header";
export default function Outpass() {
  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);
  const [purpose, setPurpose] = useState("");
  const [location, setLocation] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUser() {
      const data = await fetchData("/users/me");
      setUser(data);
    }
    async function fetchStudent() {
      const data = await fetchData(`/student/me`);
      setStudent(data);
    }
    fetchUser();
    fetchStudent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location || !purpose || !fromTime || !toTime) {
      setError("All fields are necessary !!");
      return;
    }
    setError("");
    try {
      const token = localStorage.getItem("Token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/outpass/createOutpass`,
        {
          purpose,
          location,
          fromTime,
          toTime,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data);
      alert("Outpass created successfully");
      navigate("/student/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error creating outpass");
    }
  };

  if (!user || !student) return <p>Loading...</p>;

  return (
    <>
      <Header/>
      <div className="OutpassContainer">
        <form className="FormGrid" onSubmit={handleSubmit}>
          <div className="FormRow">
            <ReadOnlyForm id="name" name="Name" value={user.name} />
          </div>

          <div className="FormRow">
            <ReadOnlyForm
              id="rollNum"
              name="Roll Number"
              value={student.rollNumber}
            />
          </div>

          <div className="FormRow">
            <ReadOnlyForm id="email" name="Email" value={user.email} />
          </div>

          <div className="FormRow">
            <ReadOnlyForm id="branch" name="Branch" value={student.branch} />
          </div>

          <div className="FormRow">
            <ReadOnlyForm
              id="phNum"
              name="Phone Number"
              value={user.phoneNumber}
            />
          </div>

          <div className="FormRow">
            <ReadOnlyForm id="hostel" name="Hostel" value={student.hostel} />
          </div>

          <div className="FormRow">
            <ReadOnlyForm
              id="roomNumber"
              name="Room Number"
              value={student.roomNumber}
            />
          </div>

          <div className="FormRowSpacer" />

          <div className="FormRow">
            <FormInput
              id="location"
              name="Location"
              label="Location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="FormRow">
            <FormInput
              id="purpose"
              name="Purpose"
              label="Purpose"
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>

          <div className="FormRow">
            <FormInput
              type="datetime-local"
              id="fromTime"
              name="From"
              label={true}
              onChange={(e) => setFromTime(e.target.value)}
            />
          </div>

          <div className="FormRow">
            <FormInput
              type="datetime-local"
              id="toTime"
              name="To"
              label={true}
              onChange={(e) => setToTime(e.target.value)}
            />
          </div>

          {error && <p className="FormError">{error}</p>}
          <div className="ButtonRow">
            <Button content="Submit" />
          </div>
        </form>
      </div>
    </>
  );
}
