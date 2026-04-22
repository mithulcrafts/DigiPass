import { useState, useEffect } from "react";
import { WardenPassHistory } from "../../components/Cards/PassHistory";
import Header from "../../components/Header";
import fetchData from "../../utils/fetchData";
export default function WardenDashboard() {
  const [user, setUser] = useState(null);
  const [outpasses, setOutpasses] = useState([]);
  useEffect(() => {
    async function fetchInfo() {
      const data = await fetchData("/users/me");
      setUser(data);
      const res = await fetchData("/outpass/getAllOutpasses");
      setOutpasses(res.outPasses);
    }
    fetchInfo();
  }, []);
  return (
    <>
      <Header />
      <h1 className="welcomeMessage">Hello {user ? user.name : "bro"} !!</h1>
      <div className="passContainer">
        {outpasses.length > 0 ? (
          outpasses.map((outpass) => {
            return (
              <WardenPassHistory
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
      </div>
    </>
  );
}
