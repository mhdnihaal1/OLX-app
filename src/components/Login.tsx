import  { useState } from 'react';
import { login, signup } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate()
  const validateInputs = () => {

    if (signState === 'Sign Up' && name.trim() === '') {
      setError('Name is required for Sign Up.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    setError('');
    return true;
  };

  const user_auth = async (event:any) => {
    event.preventDefault();
    setLoading(true);
    if (!validateInputs()) {
      setLoading(false);
      return;
    }
    try {
      if (signState === 'Sign In') {
        await login(email, password);
        navigate('/')
      } else {
        await signup(name, email, password);
        navigate('/')
      }
    } catch (err) {
      // Handle error
    }
    setLoading(false);
  };

  return loading ? (
    <div className="flex items-center justify-center h-screen bg-gray-900">
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">{signState}</h1>
        <form onSubmit={user_auth} className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {signState === 'Sign Up' && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {signState}
          </button>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input type="checkbox" className="text-blue-600 rounded focus:ring-blue-500" />
              <label className="ml-2 text-sm text-gray-600">Remember Me</label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Need help?
            </a>
          </div>
        </form>
        <div className="mt-6 text-center">
          {signState === 'Sign In' ? (
            <p className="text-sm text-gray-600">
              New to Netflix?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setSignState('Sign Up')}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setSignState('Sign In')}
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
