
type MenuProps={
  setMenu:any
}

const Menubar = (props:MenuProps) => {
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start h-16 space-x-8">
          <h1 onClick={()=>props.setMenu('Shirt')} className="text-gray-800 hover:text-indigo-600 cursor-pointer transition-colors duration-200 ">Shirts</h1>
          <h1 onClick={()=>props.setMenu('Jacket')} className="text-gray-800 hover:text-indigo-600 cursor-pointer transition-colors duration-200">Jackets</h1>
          <h1 onClick={()=>props.setMenu('Mobile Phone')} className="text-gray-800 hover:text-indigo-600 cursor-pointer transition-colors duration-200">Mobile Phones</h1>
          <h1 onClick={()=>props.setMenu('Houses')} className="text-gray-800 hover:text-indigo-600 cursor-pointer transition-colors duration-200">Houses</h1>
          <h1 onClick={()=>props.setMenu('Scooter')} className="text-gray-800 hover:text-indigo-600 cursor-pointer transition-colors duration-200">Scooters</h1>
          <h1 onClick={()=>props.setMenu('Bike')} className="text-gray-800 hover:text-indigo-600 cursor-pointer transition-colors duration-200">Bikes</h1>
          <h1 onClick={()=>props.setMenu('Apartment')} className="text-gray-800 hover:text-indigo-600 cursor-pointer transition-colors duration-200">Apartments</h1>
        </div>
      </div>
    </div>
  );
};

export default Menubar;