import { Html5Qrcode } from "html5-qrcode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Scan.css";
export default function Scan() {
  const navigate = useNavigate();
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  useEffect(() => {
    //Fetching all available cameras
    Html5Qrcode.getCameras().then((devices) => {
      setCameras(devices);
      if (devices.length > 0) {
        setSelectedCamera(devices[0].id);
      }
    });
  }, []);
  useEffect(() => {
    if (!selectedCamera) return;
    let scanned = false; //Using this, so that it will scan and redirects to the respective page only once
    //Create Scanner, reader is the id for div where camera UI appears.
    const html5qrcode = new Html5Qrcode("reader");

    //Start scanner
    html5qrcode.start(
      selectedCamera,
      {
        fps: 5, //Number of captures should be made by scanner per second
        qrbox: 250, //Size of scanner
      },

      //When got scanned
      (decodedtext) => {
        if (scanned) return;
        scanned = true;

        const token = decodedtext.split("/").pop();
        navigate(`/verify/${token}`);
      },
      (error) => {}, //If error occurs, Eat 5 star do nothing [Because while scanning errors may occur]
    );

    //To stop the camera, scanner
    return () => {
      html5qrcode.stop().catch(() => {});
    };
  }, [selectedCamera]);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div className="scannerWrapper">
          <h2>Scan QR Code</h2>
          <select
            onChange={(e) => setSelectedCamera(e.target.value)}
            value={selectedCamera}
          >
            {cameras.map((cam) => (
              <option key={cam.id} value={cam.id}>
                {cam.label || "Camera"}
              </option>
            ))}
          </select>
          <div id="reader"></div>
        </div>
      </div>
    </>
  );
}
