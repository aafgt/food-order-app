import { createContext, useReducer } from "react";

const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const CLEAR_CART = "CLEAR_CART";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

const cartReducer = (state, action) => {
    if (action.type === ADD_ITEM) {
        const newItems = [...state.items];

        const newItemIndex = state.items.findIndex((item) => item.item.idMeal === action.payload.idMeal);

        if (newItemIndex === -1) {
            newItems.push({ item: action.payload, quantity: 1});
        }
        else {
            const item = newItems[newItemIndex];
            newItems[newItemIndex] = {...item, quantity: item.quantity+1};
        }

        return {
            ...state,
            items: newItems
        }
    }

    if (action.type === REMOVE_ITEM) {
        const newItems = [...state.items];

        const newItemIndex = state.items.findIndex((item) => item.item.idMeal === action.payload);

        if (newItemIndex > -1) {
            const item = newItems[newItemIndex];

            if (item.quantity > 1) {
                newItems[newItemIndex] = {...item, quantity: item.quantity-1};
            }
            else {
                newItems.splice(newItemIndex, 1);
            }
        }

        return {
            ...state,
            items: newItems
        }
    }

    if (action.type === CLEAR_CART) {
        return {
            ...state,
            items: []
        }
    }

    return state;
}

export const CartContextProvider = ({ children }) => {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {
        items: []
    });

    const addItem = (item) => {
        dispatchCartAction({ type: ADD_ITEM, payload: item });
    }

    const removeItem = (id) => {
        dispatchCartAction({ type: REMOVE_ITEM, payload: id });
    }

    const clearCart = () => {
        dispatchCartAction({ type: CLEAR_CART });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    }

    return <CartContext value={cartContext}>{children}</CartContext>;
}

export default CartContext;