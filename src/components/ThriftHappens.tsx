import { useState } from "react";
import type { Product, CartItem } from "../types";
import { products as initialProducts } from "../data/data";
import NavBar from "./NavBar";
import ItemsContainer from "./ItemsContainer";
import CheckoutContainer from "./CheckoutContainer";

function ThriftHappens() {
    const [products, setProducts] = useState<Product[]>(
        initialProducts.map(product => ({
            ...product,
            itemQuantity: 0
        }))
    );

    const [cart, setCart] = useState<CartItem[]>([]);

    function addToCheckout(productId: number, selectedQuantity: number) {
        if (selectedQuantity <= 0) {
            return;
        }

        const selectedProduct = products.find(
            product => product.id === productId
        );

        if (!selectedProduct || selectedQuantity > selectedProduct.quantity) {
            return;
        }

        setProducts(previousProducts =>
            previousProducts.map(product =>
                product.id === productId
                    ? {
                        ...product,
                        quantity: product.quantity - selectedQuantity,
                        itemQuantity: 0
                    }
                    : product
            )
        );

        setCart(previousCart => {
            const existingItem = previousCart.find(
                item => item.productId === productId
            );

            if (existingItem) {
                return previousCart.map(item =>
                    item.productId === productId
                        ? {
                            ...item,
                            quantity: item.quantity + selectedQuantity
                        }
                        : item
                );
            }

            return [
                ...previousCart,
                {
                    productId,
                    quantity: selectedQuantity
                }
            ];
        });
    }

    function removeFromCheckout(productId: number) {
        const removedItem = cart.find(
            item => item.productId === productId
        );

        if (!removedItem) {
            return;
        }

        setCart(previousCart =>
            previousCart.filter(item => item.productId !== productId)
        );

        setProducts(previousProducts =>
            previousProducts.map(product =>
                product.id === productId
                    ? {
                        ...product,
                        quantity: product.quantity + removedItem.quantity,
                        itemQuantity: 0
                    }
                    : product
            )
        );
    }

    function emptyCheckout() {
        setProducts(previousProducts =>
            previousProducts.map(product => {
                const cartItem = cart.find(
                    item => item.productId === product.id
                );

                return {
                    ...product,
                    quantity: product.quantity + (cartItem?.quantity ?? 0),
                    itemQuantity: 0
                };
            })
        );

        setCart([]);
    }

    const grandTotal = cart.reduce((total, item) => {
        const product = products.find(
            product => product.id === item.productId
        );

        return total + (product ? product.price * item.quantity : 0);
    }, 0);

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <div className="thrift-app">
            <NavBar cartCount={cartCount} />

            <main className="main-content">
                <section className="catalogue-section">
                    <div className="section-heading">
                        <h2>Browse Our Collection</h2>
                        <p>
                            Give pre-loved clothing a second chance.
                            Find something unique today.
                        </p>
                    </div>

                    <ItemsContainer
                        products={products}
                        onAddToCheckout={addToCheckout}
                    />
                </section>

                <section className="checkout-section">
                    <div className="section-heading">
                        <h2>Your Checkout</h2>
                    </div>

                    <CheckoutContainer
                        cart={cart}
                        products={products}
                        grandTotal={grandTotal}
                        onRemove={removeFromCheckout}
                        onEmptyCheckout={emptyCheckout}
                    />
                </section>
            </main>
        </div>
    );
}

export default ThriftHappens;