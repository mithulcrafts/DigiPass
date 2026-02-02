import FuzzyText from "../components/FuzzyText";
import './styles/NotFound.css'
export default function NotFound() {
  return (
    <>
      <div className="ErrorWrapper">
        <FuzzyText  baseIntensity={0.2} hoverIntensity={0.5} enableHover>
        404
      </FuzzyText>
      <br />
      <FuzzyText
        fontSize="clamp(3.3rem, 4vw, 2.5rem)" 
        fontWeight={600}
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover
      >
        NOT FOUND
      </FuzzyText>
      </div>
    </>
  );
}
