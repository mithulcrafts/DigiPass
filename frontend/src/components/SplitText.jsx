import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const SplitText = ({
  text,
  className = "",
  delay = 50,
  duration = 1.1,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 32 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-80px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;

      const el = ref.current;

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch {}
        el._rbsplitInstance = null;
      }

      const startPct = (1 - threshold) * 100;
      const start = `top ${startPct}%${rootMargin ? rootMargin : ""}`;

      let targets;

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        charsClass: "split-char",
        wordsClass: "split-word",
        linesClass: "split-line",
        onSplit: self => {
          targets =
            self.chars?.length
              ? self.chars
              : self.words?.length
              ? self.words
              : self.lines;

          gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: true
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();
              },
              force3D: true,
              willChange: "transform, opacity"
            }
          );
        }
      });

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch {}
        el._rbsplitInstance = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded
      ],
      scope: ref
    }
  );

  const Tag = tag;

  return (
    <Tag
      ref={ref}
      className={`split-parent text-gray-900 ${className}`}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
        WebkitFontSmoothing: "antialiased"
      }}
    >
      {text}
    </Tag>
  );
};

export default SplitText;
