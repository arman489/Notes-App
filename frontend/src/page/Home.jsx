import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import { useMyContext } from "../config/Context";
import { FaCirclePlus } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Home() {
  const { api } = useMyContext();
  const [Data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  // Get All Notes
  const getData = async () => {
    try {
      setLoading(true)
      const res = await api.get("/note/getNotes");
      setData(res.data.getNote);
    } catch (error) {
      toast(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false)
    }
  };

  // Delete Note
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true)
      const res = await api.delete(`/note/deleteNotes/${id}`);
      toast(res.data.message);
      
      // Remove deleted note from UI
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast(error.response?.data?.message || "Delete Failed");
    } finally {
      setLoading(false)
    }
  };

  //// {Search Login}

  const handleSearch = async () => {
    try {
      const res = await api.get(`/note/search?search=${search}`);
      setData(res.data.notes); // ya res.data.notes (backend response ke hisaab se)
    } catch (error) {
      toast(error.response?.data?.message);
    }
  };
  ///
  useEffect(() => {
    if (search.trim() === "") {
      getData();
    } else {
      handleSearch();
    }
  }, [search]);

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <Header search={search} setSearch={setSearch} />

      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4">

          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            My Notes
          </h1>

          {Data.length > 0 ? (
            <div className="grid gap-6">
              {Data.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-xl transition-all duration-300"
                >
                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-800 break-words">
                    {item.title}
                  </h2>

                  {/* Content */}
                  <p className="mt-3 text-gray-600 line-clamp-3 break-words">
                    {item.content}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3 mt-5">
                    <button
                      onClick={() => navigate(`/single/${item._id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Read More
                    </button>

                    <button
                      onClick={() => navigate(`/edit/${item._id}`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 pt-4 border-t text-sm text-gray-500 gap-2">
                    <p>
                      <span className="font-semibold">Author:</span>{" "}
                      {item.name || "Unknown"}
                    </p>

                    <p>
                      {new Date(item.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[70vh] flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-700">
                  No Notes Found
                </h2>
                <p className="text-gray-500 mt-2">
                  Click the + button to create your first note.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Floating Add Button */}
        <NavLink to="/createform">
          <button className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition hover:scale-110">
            <FaCirclePlus className="text-3xl" />
          </button>
        </NavLink>
      </div>
    </>
  );
}

export default Home;