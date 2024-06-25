'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { CartProductType } from "../product/[productId]/ProductDetails";
import { toast } from 'react-hot-toast';

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
    paymentIntent: string | null;
    handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    const addToastRef = useRef(false);
    const removeToastRef = useRef(false);
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems');
        const cProducts: CartProductType[] | null = JSON.parse(cartItems);
        const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");
        const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);
        setCartProducts(cProducts);
        setPaymentIntent(paymentIntent);
    }, []);

    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts.reduce(
                    (acc, item) => {
                        const itemTotal = item.price * item.quantity;
                        acc.total += itemTotal;
                        acc.qty += item.quantity;
                        return acc;
                    },
                    {
                        total: 0,
                        qty: 0,
                    }
                );
                setCartTotalQty(qty);
                setCartTotalAmount(total);
            }
        };
        getTotals();
    }, [cartProducts]);

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            if (prev) {
                const existingProductIndex = prev.findIndex((item) => item.id === product.id);
                if (existingProductIndex !== -1) {
                    toast.error("Product already in cart");
                    return prev;
                }
                const updatedCart = [...prev, product];
                toast.success("Product added to cart");
                localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
                return updatedCart;
            } else {
                const updatedCart = [product];
                toast.success("Product added to cart");
                localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
                return updatedCart;
            }
        });
    }, []);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            if (prev) {
                const updatedCart = prev.filter((p) => p.id !== product.id);
                if (!removeToastRef.current) {
                    toast.success("Product removed from cart");
                    removeToastRef.current = true;
                    setTimeout(() => {
                        removeToastRef.current = false;
                    }, 500);
                }
                localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
                return updatedCart;
            }
            return prev;
        });
    }, []);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            if (!prev) return prev;
            const updatedCart = prev.map((item) =>
                item.id === product.id && item.quantity < 99
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            if (product.quantity === 99) {
                toast.error('Ooop! Maximum reached');
            } else {
                localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
            }
            return updatedCart;
        });
    }, []);

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            if (!prev) return prev;
            const updatedCart = prev.map((item) =>
                item.id === product.id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            if (product.quantity === 1) {
                toast.error('Ooop! Minimum reached');
            } else {
                localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
            }
            return updatedCart;
        });
    }, []);

    const handleClearCart = useCallback(() => {
        setCartProducts(null);
        setCartTotalQty(0);
        localStorage.setItem('eShopCartItems', JSON.stringify(null));
    }, []);

    const handleSetPaymentIntent = useCallback((val: string | null) => {
        setPaymentIntent(val);
        localStorage.setItem("eShopPaymentIntent", JSON.stringify(val));
    }, []);

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        paymentIntent,
        handleSetPaymentIntent,
    };

    return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context == null) {
        throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;
};
