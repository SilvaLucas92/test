import Footer from "../Footer";
import Navbar from "../Navbar";
import styles from "./main.module.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className={styles.container}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
