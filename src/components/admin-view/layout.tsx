import { Outlet } from "react-router";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

export default function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenSidebar} />
        <main className="flex-1 flex-col flex bg-muted/40 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
