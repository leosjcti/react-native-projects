import React, { createContext, useState } from "react";

export const CartContext = createContext({});

function CartProvider( {children} ) {

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    function addItemCart( newItem ) {
        //Verifica se o intem já está no carrrinho
        const indexItem = cart.findIndex( item => item.id === newItem.id)
        
        if(indexItem !== -1){
            //Como entrou aqui, add + 1 porque ele já está na lista
            let cartList = cart;
            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

            setCart(cartList)
            totalResultCart(cartList)
            return;
        }

        let data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }        
        //Adiciona os itens existentes + o novo objeto data
        setCart(products => [...products, data])
        totalResultCart([...cart, data])
    }



    function removeItemCart(product) {
        const indexItem = cart.findIndex( item => item.id === product.id)
    
        if(cart[indexItem]?.amount > 1){
            //Como entrou aqui, add + 1 porque ele já está na lista
            let cartList = cart;
            cartList[indexItem].amount = cartList[indexItem].amount - 1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;
    
            setCart(cartList)
            totalResultCart(cartList)
            return;
        }
        //Retorna todos os itens diferentes do atual
        const removeItem = cart.filter(item => item.id !== product.id)
        setCart(removeItem)
        totalResultCart(removeItem)
    }

    function totalResultCart(items) {
        let myCart = items;
        let result = myCart.reduce( (acc, obj)=> { return acc + obj.total }, 0)
        setTotal(result.toFixed(2));
    }




    return (
        <CartContext.Provider
            value={{
                cart, 
                addItemCart,
                removeItemCart,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;