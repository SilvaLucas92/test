import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Spinner } from "@/components/Spinner";
import { getProduct } from "@/services/products";
import { Inter } from "next/font/google";
import { Item } from "@/types";
import styles from "./product.module.css";
import { useRouter } from "next/router";
import { CTAModal } from "@/components/CTAModal";

const Product = () => {
  const { query, push } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Item>();
  const [isLoading, setIsLoading] = useState(false);

  const apiCall = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await getProduct(id);
      setData(res[0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    apiCall(query.id as string);
  }, [query.id]);

  return (
    <Layout>
      {isLoading && <Spinner />}
      <section className={styles.container}>
        <img src={data?.img} alt={data?.title} />
        <div className={styles.dataContainer}>
          <span onClick={() => push("/")}>Back to catalog</span>
          <h3>{data?.title}</h3>
          <p>${data?.price}</p>
          <h4 className={styles.description}>Description</h4>
          <p>{data?.description}</p>
          <button onClick={() => setOpen(true)}>CTA</button>
        </div>
      </section>
      {open && <CTAModal onClose={setOpen} />}
    </Layout>
  );
};

export default Product;
