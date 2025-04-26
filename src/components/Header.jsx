import { useContext, useState } from "react";
import Cart from "./Cart";
import Checkout from "./Checkout";
import CartContext from "../store/CartContext";
import CartIcon from "./CartIcon";
import { motion } from "framer-motion";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const cartCtx = useContext(CartContext);

  const cartItemsQuantity = () => {
    return cartCtx.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  return (
    <nav className="flex justify-between p-5 bg-orange-700 text-white sticky top-0">
      <h1 className="text-xl uppercase hover:cursor-pointer">Food-Order-App</h1>
      <p className="max-sm:text-[9px] max-sm:w-1/3">Refresh app for a new menu and updated prices.</p>
      <motion.button type="button" className="hover:cursor-pointer relative" onClick={() => setIsCartOpen(prev => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}>
        <CartIcon />
        <div className="bg-red-400 h-6 w-6 flex justify-center items-center rounded-full m-auto absolute -top-2 -right-3">
          <p className="font-bold">{cartItemsQuantity()}</p>
        </div>
      </motion.button>

      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} setIsCheckoutOpen={setIsCheckoutOpen} />
      <Checkout isCheckoutOpen={isCheckoutOpen} setIsCartOpen={setIsCartOpen} setIsCheckoutOpen={setIsCheckoutOpen} />
    </nav>
  )
}

export default Header;