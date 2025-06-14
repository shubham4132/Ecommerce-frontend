import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* Left Section */}
      <div className="hidden lg:flex flex-col w-1/2 bg-black items-center justify-center px-12">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Welcome to Digital Dukan
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
