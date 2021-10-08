import { CartProvider } from 'react-use-cart';
import './App.css';
import Routes from './config/routes';

function App() {
  return (
    <>
      <CartProvider>
        <Routes />
      </CartProvider>
    </>
  );
}

export default App;
