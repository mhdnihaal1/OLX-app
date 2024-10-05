
import  { useState, useEffect } from 'react';
import Navbar from './Navbar';  
import Menubar from './Menubar';  
import Home from './Home'; 
import Footer from './Footer';  

const App = () => {
  const [products, setProducts] = useState<any[]>([]);  
  const [search, setSearch] = useState(''); 
  const [menu, setMenu] = useState('');  

  const getproducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');  
      const data = await response.json();
      setProducts(data); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getproducts();
  }, []); 

  return (
    <div>
      <Navbar setSearch={setSearch} />  
      <Menubar setMenu={setMenu} />     
      <Home products={products} search={search} menu={menu} /> 
      <Footer />
    </div>
  );
};

export default App;
