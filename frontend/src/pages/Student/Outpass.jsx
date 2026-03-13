// import {} from "../../components/ReadOnlyForm";
import { ReadOnlyForm, FormInput } from "../../components/FormInput";
import { useState, useEffect } from "react";
import getUser from "../../utils/getUser";
import getStudent from "../../utils/getStudent";
export default function Outpass() {
  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);
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
    <>
      <ReadOnlyForm id="name" name="Name" value={user.name} />
      <br />
      <ReadOnlyForm id="email" name="Email" value={user.email} />
      <br />
      <ReadOnlyForm id="phNum" name="Phone Number" value={user.phoneNumber} />
      <br />
      <FormInput id="location" name="Location" placeholder="Location" />
      <br />
      <FormInput type="date" id="fromTime" name="fromTime" placeholder="from" />
      <br />
      <FormInput type="date" id="toTime" name="toTime" placeholder="to" />
      <br />
      <ReadOnlyForm id="rollNum" name="Roll Number" value={student.rollNumber}/>
      <br />
      <ReadOnlyForm id="hostel" name="Hostel" value={student.hostel}/>
      <br />
      <ReadOnlyForm id="roomNumber" name="Room Number" value={student.roomNumber}/>
    </>
  );
}
