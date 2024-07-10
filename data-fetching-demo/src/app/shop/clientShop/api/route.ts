import { NextRequest } from "next/server";
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
};
export async function GET() {
  const response = await fetch("http://localhost:3001/products");
  return response
}
export async function POST(request:NextRequest) {
  const body = await request.json()
  console.log(JSON.stringify(body))
  await fetch("http://localhost:3001/products", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
 const response = await fetch("http://localhost:3001/products");
 const products : Product[] = await response.json()
 const latsProduct = products[products.length - 1]
 return  Response.json(latsProduct)
}
