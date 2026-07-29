import React, { useState } from "react";
import { useMyContext } from "../config/Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineSearch, HiOutlineMenu } from "react-icons/hi";
import Loading from "./Loading";

function Header({ search, setSearch }) {
  const { isUser, api } = useMyContext();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      const res = await api.post("/api/logout");

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      {loading && <Loading />}

      <header className="sticky top-0 z-50 bg-blue-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* Logo + Mobile Avatar */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">
                <HiOutlineMenu className="text-3xl text-white md:hidden cursor-pointer" />

                <h1 className="text-2xl font-bold text-white">
                  My Notes
                </h1>
              </div>

              {/* Mobile Avatar */}
              <div className="relative md:hidden">

                <div
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer"
                >
                  <span className="text-lg font-bold text-blue-600">
                    {isUser?.name?.[0]?.toUpperCase()}
                  </span>
                </div>

                {open && (
                  <div className="absolute right-0 top-12 z-[9999] w-40 bg-white rounded-lg shadow-2xl border border-gray-200">

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-red-100 hover:text-red-600 transition"
                    >
                      Logout
                    </button>

                  </div>
                )}

              </div>

            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-2xl">

              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 md:text-white text-xl" />

              <input
                type="text"
                placeholder="Search Notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg py-3 pl-12 pr-4
                bg-white md:bg-blue-500
                text-black md:text-white
                placeholder-gray-500 md:placeholder-white/70
                outline-none"
              />

            </div>

            {/* Desktop User */}
            <div className="hidden md:flex items-center gap-4 relative">

              <h2 className="text-white font-medium whitespace-nowrap">
                Welcome, {isUser?.name}
              </h2>

              <div
                onClick={() => setOpen(!open)}
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center cursor-pointer"
              >
                <span className="text-xl font-bold text-blue-600">
                  {isUser?.name?.[0]?.toUpperCase()}
                </span>
              </div>

              {open && (
                <div className="absolute right-0 top-14 z-[9999] w-40 bg-white rounded-lg shadow-2xl border border-gray-200">

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-100 hover:text-red-600 transition"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>
      </header>
    </>
  );
}

export default Header;