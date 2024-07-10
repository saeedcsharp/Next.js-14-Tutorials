"use client";
import { addProduct } from "@/app/shop/addProduct";

function Form() {
  async function clientAction(formData: FormData) {
    const result = await addProduct(formData);
    if (result?.error) {
          alert(result.error)
    }
  }
  return (
    <form
      action={clientAction}
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
  );
}

export default Form;
    