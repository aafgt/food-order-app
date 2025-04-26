import { useContext } from "react";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";

const Cart = ({ isCartOpen, setIsCartOpen, setIsCheckoutOpen }) => {

    const cartCtx = useContext(CartContext);

    const cartTotal = cartCtx.items.reduce((total, item) => {
        return total + (item.quantity * item.item.price);
    }, 0).toFixed(2);

    return (
        <Modal open={isCartOpen} onClose={() => setIsCartOpen(false)}>
            <div className="flex flex-col justify-between h-full">
                <p className="text-xl font-bold">Your Cart</p>

                <div className="flex-auto my-5 overflow-y-auto">
                    {cartCtx.items.length <= 0 && <p>There are no items in your cart...</p>}
                    {cartCtx.items.length > 0 &&
                        <div className="space-y-3">
                            {cartCtx.items.map((item) => (
                                <div key={item.item.idMeal} className="flex justify-around">
                                    <div className="flex flex-auto justify-around space-x-4">
                                        <p className="w-1/2">{item.item.strMeal}</p>
                                        <p className="w-1/2 my-auto">EGP {item.item.price}</p>
                                    </div>

                                    <div className="flex mx-auto md:w-3/12 md:justify-around">
                                        <div className="flex justify-center items-center">
                                            <button className="bg-red-300 text-red-800 font-bold rounded-full hover:cursor-pointer h-5 w-5 flex justify-center items-center" onClick={() => { cartCtx.removeItem(item.item.idMeal); }}>-</button>
                                        </div>
                                        <p className="mx-5 my-auto text-center">x{item.quantity}</p>
                                        <div className="flex justify-center items-center">
                                            <button className="bg-green-300 text-green-800 font-bold rounded-full hover:cursor-pointer h-5 w-5 flex justify-center items-center" onClick={() => { cartCtx.addItem(item.item); }}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>

                <div className="flex flex-col items-end gap-5">
                    <p className="text-xl font-bold">Total: <span className="text-2xl">EGP {cartTotal}</span></p>
                    <p className="flex gap-5">
                        <Button type="button" onClick={() => setIsCartOpen(false)}>Cancel</Button>
                        {cartCtx.items.length > 0 && <Button className="bg-green-300 text-green-800 hover:bg-green-500 hover:text-white" type="button" onClick={() => setIsCheckoutOpen(true)}>Checkout</Button>}
                    </p>
                </div>
            </div>
        </Modal>
    )
}

export default Cart;