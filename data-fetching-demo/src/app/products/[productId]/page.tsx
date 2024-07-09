type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
};

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: number };
}) {
  const detailsResponse = await fetch(
    `http://localhost:3001/products/${params.productId}`,
    {next:{revalidate:20}}
  );
  const details = await detailsResponse.json();
  return (
    <li
    className="p-4 bg-white shadow-md rounded-lg text-gray-700"
  >
    <div
      className="text-xl font-semibold"
    >
      {details.title}
    </div>
    <p>{details.description}</p>
    <p className="text-lg font-medium">${details.price}</p>
    <p>{details.title}</p>
  </li>
  );
}
