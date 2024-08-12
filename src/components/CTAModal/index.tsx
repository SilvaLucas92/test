import { Input } from "../Input";
import { Modal } from "../Modal";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./modal.module.css";
import { Leads } from "@/types";
import { postLeads } from "@/services/leads";
import { SpinnerBtn } from "../Spinner";

interface CTAProps {
  onClose: (value: boolean) => void;
}

export const CTAModal = ({ onClose }: CTAProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState<{
    type: string;
    msg: string;
  } | null>(null);
  const [formState, setFormState] = useState<Leads>({
    name: "",
    lastname: "",
    email: "",
    description: "",
  });

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent, payload: Leads) => {
    e.preventDefault();
    const anyEmpty = Object.keys(payload).some(
      (item) => !(payload as Record<string, any>)[item]
    );
    if (anyEmpty) {
      setMsg({ type: "error", msg: "All fields are required" });
      return;
    }
    setIsLoading(true);
    try {
      const data = await postLeads(payload);
      if (data.status !== 200) {
        setMsg({ type: "error", msg: "Something went wrong!" });
      }
      setIsLoading(false);
      setFormState({
        name: "",
        lastname: "",
        email: "",
        description: "",
      });
      setMsg({
        type: "success",
        msg: "CTA submitted",
      });
    } catch (err) {
      // alert("Something went wrong!");
      setMsg({ type: "error", msg: "Something went wrong!" });
      setIsLoading(false);
    }
  };

  return (
    <Modal title="CTA" onClose={onClose}>
      <form onSubmit={(e) => onSubmit(e, formState)}>
        <section className={styles.container}>
          <div className={styles.names}>
            <Input
              value={formState.name}
              onChange={(e) => handleInput(e)}
              label={"Name"}
              name="name"
            />
            <Input
              value={formState.lastname}
              onChange={(e) => handleInput(e)}
              label={"Lastname"}
              name="lastname"
            />
          </div>
          <Input
            value={formState.email}
            onChange={(e) => handleInput(e)}
            label={"Email"}
            name="email"
          />
          <div className={styles.textContainer}>
            <label htmlFor="description">CTA</label>
            <textarea
              // placeholder="Enter CTA here"
              className={styles.textarea}
              onChange={(e) => handleInput(e)}
              value={formState.description}
              name={"description"}
              id={"description"}
            />
          </div>
          {msg && (
            <p
              style={{
                color: msg.type === "success" ? "green" : "red",
              }}
            >
              {msg.msg}
            </p>
          )}
          <button type="submit">{isLoading ? <SpinnerBtn /> : "Submit"}</button>
        </section>
      </form>
    </Modal>
  );
};
