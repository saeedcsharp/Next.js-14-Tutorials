import { revalidatePath, revalidateTag } from "next/cache";
import { Suspense } from "react";
import { addProduct } from "./addProduct";
import Form from "../../../component/form";
type Product = {
  id: number;
  title: string;
  price: number;  
  description: string;
};
export default async function Shop() {
  const response = await fetch("http://localhost:4000/productsffref", {
  cache:"no-cache"
  });
  const products: Product[] = await response.json();

  return (
    <Suspense fallback={<h1> ...Loading </h1>}>
     <Form/>
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
