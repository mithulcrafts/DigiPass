import FuzzyText from "../components/FuzzyText";
export default function Unauthorized() {
  return (
    <>
      <div className="ErrorWrapper">
        <FuzzyText  baseIntensity={0.2} hoverIntensity={0.5} enableHover>
        403
      </FuzzyText>
      <br />
      <FuzzyText
        fontSize="clamp(3.3rem, 4vw, 2.5rem)" 
        fontWeight={600}
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover
      >
        UNAUTHORIZED
      </FuzzyText>
      </div>
    </>
  );
}
