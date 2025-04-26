import { useContext } from "react";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";

const Checkout = ({ isCheckoutOpen, setIsCartOpen, setIsCheckoutOpen }) => {

    const cartCtx = useContext(CartContext);

    const cartTotal = cartCtx.items.reduce((total, item) => {
        return total + (item.quantity * item.item.price);
    }, 0).toFixed(2);

    const handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        
        const order = {
            items: cartCtx.items,
            customer: customerData,
            total: cartTotal
        }

        console.log("order", order);

        cartCtx.clearCart();
        setIsCheckoutOpen(false);
        setIsCartOpen(false);

        alert("Order Placed Successfully. Check browser console for order information.");
    };

    return (
        <Modal open={isCheckoutOpen} onClose={() => { setIsCheckoutOpen(false); }}>
            <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-5 h-full overflow-y-auto">
                <p className="text-xl font-bold">Checkout</p>

                <div className="space-y-3">
                    <div className="flex justify-between gap-3 max-lg:flex-col">
                        <div className="flex-auto">
                            <Input label="Name" id="name" type="text" required />
                        </div>
                        <Input label="Mobile Number" id="mobileNumber" type="text" required />
                    </div>
                    <Input label="E-Mail" id="email" type="email" required />
                    <Input label="Address" id="address" type="text" required />
                </div>

                <p className="flex justify-end gap-5">
                    <Button type="button" onClick={() => setIsCheckoutOpen(false)}>Cancel</Button>
                    <Button className="bg-green-300 text-green-800 hover:bg-green-500 hover:text-white">Submit</Button>
                </p>
            </form>
        </Modal>
    )
}

export default Checkout;