import { useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-5xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-96 w-full object-cover md:w-96" src={data?.image} alt={data?.title} />
          </div>
          <div className="p-8">
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900">{data?.title}</h1>
            <p className="mt-4 text-4xl font-bold text-gray-900">${data?.price}</p>
            <div className="mt-4 flex items-center">
              <span className="ml-2 text-sm text-gray-600">(4.0)</span>
            </div>
            <p className="mt-6 text-gray-500">{data?.description}</p>
            <div className="mt-8">
         
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;