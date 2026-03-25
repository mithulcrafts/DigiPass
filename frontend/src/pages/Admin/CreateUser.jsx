import "./styles/CreateUser.css";
import { useState } from "react";
import { FormInput } from "../../components/FormInput";
import Button from "../../components/Button";
function StudentFields() {
  const [rollNum, setRollNum] = useState("");
  const [branch, setBranch] = useState("");
  const [hostel, setHostel] = useState("");
  const [roomNum, setRoomNum] = useState("");
  return (
    <>
      <FormInput
        name="rollNum"
        id="rollNum"
        placeholder="RollNumber"
        onChange={(e) => setRollNum(e.target.value)}
      />
      <FormInput
        name="branch"
        id="branch"
        placeholder="Branch"
        onChange={(e) => setBranch(e.target.value)}
      />
      <FormInput
        name="hostel"
        id="hostel"
        placeholder="Hostel"
        onChange={(e) => setHostel(e.target.value)}
      />
      <FormInput
        name="roomNum"
        id="roomNum"
        placeholder="RoomNum"
        onChange={(e) => setRoomNum(e.target.value)}
      />
    </>
  );
}
function WardenFields() {
  const [staffId, setStaffId] = useState("");
  const [block, setBlock] = useState("");
  const [designation, setDesignation] = useState("");
  return (
    <>
      <FormInput
        name="staffId"
        id="staffId"
        placeholder="StaffId"
        onChange={(e) => setStaffId(e.target.value)}
      />
      <FormInput
        name="block"
        id="block"
        placeholder="Block"
        onChange={(e) => setBlock(e.target.value)}
      />
      <FormInput
        name="designation"
        id="designation"
        placeholder="Designation"
        onChange={(e) => setDesignation(e.target.value)}
      />
    </>
  );
}
function GuardFields() {
  const [staffId, setStaffId] = useState("");
  const [gate, setGate] = useState("");
  return (
    <>
      <FormInput
        name="staffId"
        id="staffId"
        placeholder="StaffId"
        onChange={(e) => setStaffId(e.target.value)}
      />
      <FormInput
        name="gate"
        id="gate"
        placeholder="Gate"
        onChange={(e) => setGate(e.target.value)}
      />
    </>
  );
}
export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phNum, setPhNum] = useState("");
  const [role, setRole] = useState("");
  return (
    <>
      <div>
        <form>
          <FormInput
            name="name"
            id="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <FormInput
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            name="phNum"
            id="phNum"
            placeholder="Phone Number"
            onChange={(e) => setPhNum(e.target.value)}
          />
          <select className="FormSelect" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select user role</option>
            <option value="Student">Student</option>
            <option value="Warden">Warden</option>
            <option value="Guard">Guard</option>
          </select>
          {role === "Student" && <StudentFields />}
          {role === "Guard" && <GuardFields />}
          {role === "Warden" && <WardenFields />}
          <Button content="Create User"/>
        </form>
      </div>
    </>
  );
}
