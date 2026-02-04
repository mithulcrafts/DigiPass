import { motion } from "framer-motion";
import { useMemo } from "react";

const buildKeyframes = (from, steps) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap(s => Object.keys(s))
  ]);

  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });

  return keyframes;
};

const BlurText = ({
  text = "",
  start = false, 
  delay = 180,
  className = "",
  animateBy = "words",
  direction = "top",
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.3
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(6px)", opacity: 0, y: -28 }
        : { filter: "blur(6px)", opacity: 0, y: 28 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: "blur(2px)", opacity: 0.6, y: direction === "top" ? 4 : -4 },
      { filter: "blur(0px)", opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <p
      className={`text-gray-900 ${className}`}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        return (
          <motion.span
            key={index}
            className="inline-block will-change-[transform,filter,opacity]"
            initial={fromSnapshot}
            animate={start ? animateKeyframes : fromSnapshot} // ✅ FIX
            transition={{
              duration: totalDuration,
              times,
              delay: (index * delay) / 1000,
              ease: easing
            }}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;
