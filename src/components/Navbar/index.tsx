import { useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <Link
        style={{
          textDecoration: "none",
          color: "blueviolet",
        }}
        href={"/"}
      >
        <div className={styles.container}>
          <h1 className={styles.title}>Simpli Muv</h1>
        </div>
      </Link>
    </header>
  );
};

export default Navbar;
