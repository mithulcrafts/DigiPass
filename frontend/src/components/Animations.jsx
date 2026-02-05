"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { motion } from "framer-motion";
export function CalendarIcon({
  size = 18,
  color = "#374151",
  animateOnHover = true
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
      initial={{ opacity: 0.85 }}
      whileHover={
        animateOnHover
          ? { scale: 1.1 }
          : undefined
      }
      transition={{ duration: 0.25, ease: "easeOut" }}
    >

      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />


      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />

      <line x1="3" y1="10" x2="21" y2="10" />
    </motion.svg>
  );
}

export function ChevronHover({
  size = 20,
  color ="var(--secondary)"
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"   
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0.85 }}
      whileHover={{ x: 4, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <path d="m9 18 6-6-6-6" />
    </motion.svg>
  );
}

export  function MapPinHover({
  size = 24,
  color = "#374151" 
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
      initial={{ opacity: 0.85 }}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >

      <motion.path
        d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      />


      <motion.circle
        cx="12"
        cy="10"
        r="3"
        initial={{ scale: 0.9, opacity: 0.9 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

