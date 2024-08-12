import styles from "./footer.module.css";

const bikesInfo = ["category1", "category2", "category3"];

const links = [];

const Footer = () => {
  return (
    <footer className={styles.container}>
      <h2>SimpliMuv</h2>
      <div>
        <p className={styles.titles}>Bikes</p>
        <ul className={styles.ul}>
          {bikesInfo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className={styles.titles}>Acceories</p>
        <ul className={styles.ul}>
          {bikesInfo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className={styles.titles}>Apparel</p>
        <ul className={styles.ul}>
          {bikesInfo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
