import { Outlet } from "react-router";

function ShoppingLayOut() {
  return (
    <div>
      ShopLayout
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default ShoppingLayOut;
