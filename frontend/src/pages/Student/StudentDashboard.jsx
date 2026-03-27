import { useState, useEffect } from "react";
import { StudentPassHistory } from "../../components/Cards/PassHistory";
import Header from "../../components/Header";
import {getUser} from "../../utils/getUser";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import getOutpasses from "../../utils/getOutpasses";
import './styles/StudentDashboard.css';
export default function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [outpasses, setOutpasses] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getUser();
      setUser(data);
      const res = await getOutpasses("/outpass/getOutpasses");
      setOutpasses(res.data.outpasses);
    }
    fetchData();
  }, []);
  return (
    <>
      <Header/>
      <h1 className="welcomeMessage">Hello {user ? user.name : "bro"} !!</h1>
      <div className="passContainer">
        {outpasses.length > 0 ? (
          outpasses.map((outpass) => {
            return (
              <StudentPassHistory
                key={outpass._id}
                id={outpass._id}
                Purpose={outpass.purpose}
                Status={outpass.status}
                FromDate={new Date(outpass.fromTime).toLocaleDateString()}
                ToDate={new Date(outpass.toTime).toLocaleDateString()}
                Destination={outpass.location}
              />
            );
          })
        ) : (
          <p>No outpasses requested</p>
        )}
        <Button
        content="Request outpass"
        onClick={() => {
          navigate("/student/Outpass");
        }}
      />
      </div>
    </>
  );
}
