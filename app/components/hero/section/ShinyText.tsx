import React from "react";

interface ShinyTextProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function ShinyText({
  text,
  children,
  className = "",
}: ShinyTextProps) {
  return (
    <span
      className={`relative inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, #9ca3af 0%, #e5e7eb 25%, #ffffff 45%, #e5e7eb 60%, #9ca3af 100%)",
        backgroundSize: "250% auto",
        animation: "shiny-sweep 3s linear infinite",
      }}
    >
      {children ?? text}
    </span>
  );
}