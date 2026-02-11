import type React from "react";
import "./ActionButton.css";

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "success" | "warning" | "danger";
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  className,
}) => {
  return (
    <button
      className={`action-button ${variant} ${className || ""}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
};

export default ActionButton;
