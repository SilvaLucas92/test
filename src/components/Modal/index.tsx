import { Children } from "react";
import styles from "./modal.module.css";
import { RiCloseLine } from "react-icons/ri";

interface ModalProps {
  title: string;
  onClose: (value: boolean) => void;
  children: React.ReactNode;
}

export const Modal = ({ title, onClose, children }: ModalProps) => {
  return (
    <div className={styles.darkBG} role="dialog">
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.title}>
            <p>{title}</p>
            <button
              role="close-button"
              className={styles.closeBtn}
              onClick={() => onClose(false)}
            >
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
          </div>
          <section className={styles.container}>{children}</section>
        </div>
      </div>
    </div>
  );
};
