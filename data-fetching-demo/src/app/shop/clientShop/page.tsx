"use client";
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
};
export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [refre, setRefre] = useState(false);
  const addProduct = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const newPrice = {
      description: "asaaaaaaa",
      price: price,
      title: title,
    };
   const response = await fetch("/shop/clientShop/api", {
      method: "POST",
      body: JSON.stringify(newPrice),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const lastProduct = await response.json()
    setProducts([...products,lastProduct])
    // setRefre(!refre)
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/shop/clientShop/api");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div>
      <form className="flex flex-col gap-5 max-w-xl bg-slate-800 rounded-md p-8 mx-auto">
        <input
          name="title"
          value={title}
          type="text"
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder="title"
          className="p-2 bg-slate-600 rounded-md outline-none"
        />
        <input
          name="price"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.currentTarget.value)}
          placeholder="price"
          className="p-2 bg-slate-600 rounded-md outline-none"
        />
        <button
          onClick={(e)=>addProduct(e)}
          className="p-2 bg-slate-900 text-slate-100 rounded-md"
        >
          Add Product
        </button>
      </form>
      <div className="flex flex-wrap justify-center gap-5 max-w-xl mx-auto my-10 ">
        {products.map((p) => (
          <div key={p.id} className="bg-slate-300 p-5 text-center rounded-md">
            <div>{p.title}</div>
            <div>${p.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
