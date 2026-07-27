import React, { useEffect, useState } from "react";
import { useMyContext } from "../config/Context";
import { useParams } from "react-router-dom";
import Header from "../component/Header";
import Loading from '../component/Loading'


function Singlepage() {
  const [loading,setLoading]=useState(false)
  const [singleData, setSingleData] = useState({});
  const { api } = useMyContext();
  const { id } = useParams();

  const handleSingleData = async () => {
    try {
      setLoading(true)
      const res = await api.get(`/note/single/${id}`);
      setSingleData(res.data.single);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    handleSingleData();
  }, []);

  if(loading){
    return(
      <Loading/>
    )
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 break-words">
            {singleData.title}
          </h1>

          {/* Author & Date */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 border-b pb-4 gap-2">
            <p className="text-gray-600">
              <span className="font-semibold">Author:</span>{" "}
              {singleData.name || "Unknown"}
            </p>

            <p className="text-sm text-gray-500">
              {singleData.createdAt &&
                new Date(singleData.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
            </p>
          </div>

          {/* Content */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Note Content
            </h2>

            <p className="text-gray-700 leading-8 whitespace-pre-wrap break-words">
              {singleData.content}
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Singlepage;