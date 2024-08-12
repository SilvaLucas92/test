import { useRouter } from "next/router";
import styles from "./card.module.css";

interface CardProps {
  image: string;
  title: string;
  price: number;
  id: string;
}

export const Card = ({ image, title, price, id }: CardProps) => {
  const { push } = useRouter();

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.price}>${price}</p>
      <button onClick={() => push(`/product/${id}`)}>Ver mas</button>
    </div>
  );
};
