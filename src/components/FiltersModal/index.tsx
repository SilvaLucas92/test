import { ChangeEvent, useState } from "react";
import { Input } from "../Input";
import { Modal } from "../Modal";
import styles from "./filters.module.css";
import Select from "../Select";

interface FiltersProps {
  filters: Record<string, any> | null;
  setFilters: (value: Record<string, any>) => void;
  onClose: (value: boolean) => void;
  setPage: (value: number) => void;
}

export const FiltersModal = ({
  filters,
  setFilters,
  onClose,
  setPage,
}: FiltersProps) => {
  const [formState, setFormState] = useState({
    category: filters?.category || "",
    less: filters?.less || "",
    greater: filters?.greater || "",
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSave = (form: Record<string, any>) => {
    let newFilters: Record<string, any> = {};
    for (let key in form) {
      const value = form[key];
      if (value !== "") {
        newFilters[key] = value;
      }
    }
    setFilters(newFilters);
    setPage(1);
    onClose(false);
  };

  return (
    <Modal title="Filters" onClose={onClose}>
      <div className={styles.modalSections}>
        <Select
          data={[
            { label: "Motorcicles", value: "motorbike" },
            { label: "Accesories", value: "accesory" },
            { label: "All", value: "" },
          ]}
          onChange={(e) =>
            setFormState((prev: any) => ({
              ...prev,
              category: e === "all" ? "" : e,
            }))
          }
          value={formState.category}
          label="Categories"
        />
      </div>
      <div className={styles.modalSections}>
        <Input
          name="greater"
          onChange={(e) => handleInput(e)}
          value={formState.greater}
          label="Price greater than"
        />
      </div>
      <div className={styles.modalSections}>
        <Input
          name="less"
          onChange={(e) => handleInput(e)}
          value={formState.less}
          label="Price less than"
        />
      </div>

      <button onClick={() => onSave(formState)} className={styles.btn}>
        save
      </button>
    </Modal>
  );
};
