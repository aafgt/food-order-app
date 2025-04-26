import { useContext } from "react";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { AnimatePresence, motion } from "framer-motion";

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

const Meal = ({ meal }) => {

    const cartCtx = useContext(CartContext);

    return (
        <AnimatePresence
            initial={true}
            exitBeforeEnter={true}
            onExitComplete={() => null}
        >
            <motion.div className="bg-white rounded-lg shadow-lg px-3 py-1 flex flex-col gap-5"
                onClick={(e) => e.stopPropagation()}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"

            // drag
            // dragConstraints={{
            //     top: -150,
            //     left: -150,
            //     right: 150,
            //     bottom: 150,
            // }}
            // dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}

            // initial={{ opacity: 0, scale: 0 }}
            // animate={{ opacity: 1, scale: 1 }}
            // transition={{
            //     duration: 0.4,
            //     scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            // }}
            >
                <div className="h-1/3 grid place-items-center">
                    <h2 className="text-2xl font-bold text-center">{meal.strMeal}</h2>
                </div>

                <img src={meal.strMealThumb} alt={meal.strMeal} className="object-contain rounded-lg" />

                <div className="flex flex-col items-end h-1/3 mb-3 gap-3">
                    <p className="text-xl font-bold">EGP {meal.price}</p>
                    <Button className="bg-green-300 text-green-800 hover:bg-green-500 hover:text-white" type="button" onClick={() => { cartCtx.addItem(meal); }}>Add To Cart</Button>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Meal;