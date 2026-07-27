import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useMyContext } from "../config/Context";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from './Loading'

function EditNote() {
  const { api } = useMyContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [EditLoding,setEditLoging]=useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    name: "",
  });

  // Get Single Note
  const getSingleNote = async () => {
    try {
      const res = await api.get(`/note/single/${id}`);

      setFormData({
        title: res.data.single.title,
        content: res.data.single.content,
        name: res.data.single.name,
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getSingleNote();
  }, []);

  // Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update Note
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setEditLoging(true)
      const res = await api.put(`/note/updateNotes/${id}`, formData);
      
      toast.success(res.data.message);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }finally{
      setEditLoging(false)
    }
  };
  if(EditLoding){
    return(
      <Loading/>
    )
  }
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">

          <h1 className="text-3xl font-bold text-center mb-6">
            Edit Note
          </h1>

          <form onSubmit={handleUpdate} className="space-y-5">

            {/* Title */}
            <div>
              <label className="block mb-2 font-semibold">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block mb-2 font-semibold">
                Content
              </label>

              <textarea
                rows="6"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Author */}
            <div>
              <label className="block mb-2 font-semibold">
                Author
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
              > Update Note </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default EditNote;