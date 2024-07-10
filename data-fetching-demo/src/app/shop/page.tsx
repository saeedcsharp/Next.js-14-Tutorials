import { revalidatePath, revalidateTag } from "next/cache";
import { Suspense } from "react";
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
};
export default async function Shop() {
  const response = await fetch("http://localhost:3001/products", {
  cache:"no-cache"
  });
  const products: Product[] = await response.json();

  async function addProduct(e: FormData) {
    "use server";
    const title = e.get("title");
    const price = e.get("price");
    const newPrice = { title, price };
    await fetch("http://localhost:3001/products", {
      method: "POST",
      body: JSON.stringify(newPrice),
      headers: {
        "Content-Type": "application/json",
      },
      next:{
        tags:["products"]
      }
    });
    revalidateTag("products")
  }

  return (
    <Suspense fallback={<h1> ...Loading </h1>}>
      <form
        action={addProduct}
        className="flex flex-col gap-5 max-w-xl bg-slate-800 rounded-md p-8 mx-auto"
      >
        <input
          name="title"
          type="text"
          placeholder="title"
          className="p-2 bg-slate-600 rounded-md outline-none"
        />
        <input
          name="price"
          type="text"
          placeholder="price"
          className="p-2 bg-slate-600 rounded-md outline-none"
        />
        <button className="p-2 bg-slate-900 text-slate-100 rounded-md">
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
    </Suspense>
  );
}
