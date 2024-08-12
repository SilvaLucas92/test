import React from "react";
import styles from "./select.module.css";

interface SelectProps {
  value: string | number;
  onChange: (value: any) => void;
  data: { label: string; value: any }[];
  label?: string;
}

const Select = ({ value, onChange, data, label }: SelectProps) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.customSelect}
      >
        {data.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
