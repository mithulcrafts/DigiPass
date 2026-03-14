import './styles/Outpass.css'
import { ReadOnlyForm, FormInput } from "../../components/FormInput";
import { useState, useEffect } from "react";
import getUser from "../../utils/getUser";
import getStudent from "../../utils/getStudent";
import Button from "../../components/Button";
export default function Outpass() {
  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);
  const [purpose, setPurpose] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    async function fetchUser() {
      const data = await getUser();
      setUser(data);
    }
    async function fetchStudent() {
      const data = await getStudent();
      setStudent(data);
    }
    fetchUser();
    fetchStudent();
  }, []);
  if (!user || !student) return <p>Loading...</p>;
return (
    <div className="OutpassContainer">

        <div className="FormRow">
            <ReadOnlyForm id="name" name="Name" value={user.name} />
        </div>

        <div className="FormRow">
            <ReadOnlyForm id="rollNum" name="Roll Number" value={student.rollNumber} />
        </div>

        <div className="FormRow">
            <ReadOnlyForm id="email" name="Email" value={user.email} />
        </div>

        <div className="FormRow">
            <ReadOnlyForm id="branch" name="Branch" value={student.branch} />
        </div>

        <div className="FormRow">
            <ReadOnlyForm id="phNum" name="Phone Number" value={user.phoneNumber} />
        </div>

        <div className="FormRowSpacer" />

        <div className="FormRow">
            <ReadOnlyForm id="hostel" name="Hostel" value={student.hostel} />
        </div>

        <div className="FormRow">
            <ReadOnlyForm id="roomNumber" name="Room Number" value={student.roomNumber} />
        </div>

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
            <FormInput type="date" id="from" name="From" label={true} />
        </div>

        <div className="FormRow">
            <FormInput type="date" id="to" name="To" label={true} />
        </div>

        <div className="ButtonRow">
            <Button content="Submit" />
        </div>

    </div>
)
}
