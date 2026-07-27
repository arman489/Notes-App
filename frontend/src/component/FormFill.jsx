import { useState } from "react";
import { useMyContext } from "../config/Context";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

const NoteForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /// API Call
  const navigate = useNavigate()
  const { api } = useMyContext()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true)
      const res = await api.post('/note/create', formData)
      
      toast(res.data.message)
      navigate('/')
      setFormData({
        title: "",
        content: "",
        name: "",
      });
    } catch (error) {
      toast(error.response?.data.message)
    } finally {
      setSubmitting(false)
    }
  };

  if(submitting){
    return(
        <Loading/>
    )
  }

  return (
    <div className="max-w-md mx-auto p-5 mt-10 shadow-lg/60 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Note</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Content */}
        <div className="mb-3">
          <label>Content</label>
          <textarea
            name="content"
            placeholder="Enter content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="5"
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        {/* Author (Optional) */}
        <div className="mb-4">
          <label>Author (Optional)</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
            Save Note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;