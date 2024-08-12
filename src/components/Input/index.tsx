import { ChangeEvent } from "react";
import styles from "./input.module.css";

interface InputProps {
  value: any;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
}

export const Input = ({ value, onChange, label, name }: InputProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input
        placeholder="Enter text here"
        className={styles.inputStyle}
        onChange={(e) => onChange(e)}
        value={value}
        type="text"
        name={name}
        id={name}
      />
    </div>
  );
};
