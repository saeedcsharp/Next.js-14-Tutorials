'use client'
import { usePathname } from "next/navigation";
const { protocol, host } = window.location;
const baseUrl = `${protocol}//${host}`;
function Test() {
  const router = usePathname();
  const currentUrl = `${router}`;
  return (
    <div>
      Current URL: {`${baseUrl}${currentUrl}` }
    </div>
  );
}

export default Test;
