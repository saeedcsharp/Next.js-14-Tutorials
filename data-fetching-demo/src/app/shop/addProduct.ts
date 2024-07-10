"use server";
import { revalidatePath } from "next/cache";
export async function addProduct(e: FormData) {
  const title = e.get("title");
  const price = e.get("price");
  const newPrice = { title, price };
  try {
    await fetch("http://localhost:3001/products123", {
      method: "POST",
      body: JSON.stringify(newPrice),
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidatePath("http://localhost:3001/products");
  } catch (error) {
    // if (error instanceof Error) {
    //     return error
    // }else {
    //     return "Unexpected error"
    // }


    return {
        error:"erroooooooooooooooooooooor"
    }
  }
  
}
