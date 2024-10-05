import { Link } from "react-router-dom";


type ProductsProp = {
  products: any  ,
  search: string,
  menu:any;
}

const Home = ({ products, search, menu }: ProductsProp) => {
  // console.log(typeof products)
  const filterValue = search?.toLowerCase() || menu?.toLowerCase();
  
  const filteredProducts = products?.filter((data: any) => 
    data?.title?.toLowerCase().includes(filterValue)
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((data: any) => (
            <Link key={data.id} to='/details' state={{data: data}} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow duration-300 ease-in-out group-hover:shadow-xl">
                <div className="relative pb-48 overflow-hidden">
                  <img 
                    className="absolute inset-0 h-full w-full object-cover transform duration-700 ease-in-out group-hover:scale-105" 
                    src={data?.image} 
                    alt={data?.title}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate">{data?.title}</h2>
                  <p className="text-sm text-gray-500 mb-2">{data?.category}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-indigo-600">${data?.price}</p>
                    <div className="flex items-center">
                      <span className="ml-1 text-sm text-gray-600">4.5</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;