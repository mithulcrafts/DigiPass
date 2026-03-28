import { useState, useEffect } from "react";
import { getUser } from "../../utils/getUser";
import { WardenPassHistory } from "../../components/Cards/PassHistory";
import Header from "../../components/Header";
import getOutpasses from "../../utils/getOutpasses";
export default function WardenDashboard() {
  const [user, setUser] = useState(null);
  const [outpasses, setOutpasses] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getUser();
      setUser(data);
      const res = await getOutpasses("/outpass/getAllOutpasses");
      setOutpasses(res.data.outPasses);
    }
    fetchData();
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
