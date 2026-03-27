import "./styles/CreateUser.css";
import { useState } from "react";
import { FormInput } from "../../components/FormInput";
import Button from "../../components/Button";
import { handleCreateUser } from "../../services/createUserService";
import Header from "../../components/Header";
function StudentFields({ setRoleData }) {
  return (
    <>
      <FormInput
        name="rollNumber"
        id="rollNumber"
        placeholder="RollNumber"
        onChange={(e) =>
          setRoleData((prev) => ({ ...prev, rollNumber: e.target.value }))
        } //This means we are saying to keep the previous data in RoleData as it is, and update with this new field
      />
      <FormInput
        name="branch"
        id="branch"
        placeholder="Branch"
        onChange={(e) =>
          setRoleData((prev) => ({ ...prev, branch: e.target.value }))
        }
      />
      <FormInput
        name="hostel"
        id="hostel"
        placeholder="Hostel"
        onChange={(e) =>
          setRoleData((prev) => ({ ...prev, hostel: e.target.value }))
        }
      />
      <FormInput
        name="roomNumber"
        id="roomNumber"
        placeholder="Room Number"
        onChange={(e) =>
          setRoleData((prev) => ({ ...prev, roomNumber: e.target.value }))
        }
      />
    </>
  );
}
function WardenFields({ setRoleData }) {
  return (
    <>
      <FormInput
        name="S_ID"
        id="S_ID"
        placeholder="StaffId"
        onChange={(e) =>
          setRoleData((prev) => ({ ...prev, S_ID: e.target.value }))
        }
      />
      <FormInput
        name="block"
        id="block"
        placeholder="Block"
        onChange={(e) =>
          setRoleData((prev) => ({ ...prev, block: e.target.value }))
        }
      />
      <FormInput
        name="designation"
        id="designation"
        placeholder="Designation"
        onChange={(e) =>
          setRoleData((prev) => ({ ...prev, designation: e.target.value }))
        }
      />
    </>
  );
}
function GuardFields({ setRoleData }) {
  return (
    <>
      <FormInput
        name="S_ID"
        id="S_ID"
        placeholder="StaffId"
        onChange={(e) =>
          setRoleData((prev) => ({ ...prev, S_ID: e.target.value }))
        }
      />
      <FormInput
        name="gate"
        id="gate"
        placeholder="Gate"
        onChange={(e) =>
          setRoleData((prev) => ({ ...prev, gate: e.target.value }))
        }
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
  const [roleData, setRoleData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      phoneNumber: phNum,
      role,
      roleData,
    };
    try {
      const user = await handleCreateUser(data);
      alert(`User created successfully`);
    } catch (err) {
      alert(err.message || "User creation failed");
      console.error(err);
    }
  };
  return (
    <>
    <Header/>
      <div className="CreateUserContainer">
        <form onSubmit={handleSubmit}>
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
          <select
            className="FormSelect"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setRoleData({});
            }}
          >
            <option value="">Select user role</option>
            <option value="student">Student</option>
            <option value="warden">Warden</option>
            <option value="guard">Guard</option>
          </select>
          {role === "student" && <StudentFields setRoleData={setRoleData} />}
          {role === "guard" && <GuardFields setRoleData={setRoleData} />}
          {role === "warden" && <WardenFields setRoleData={setRoleData} />}
          <Button content="Create User" type="submit"/>
        </form>
      </div>
    </>
  );
}
