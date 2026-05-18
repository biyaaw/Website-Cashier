import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import pizzaMargherita from "@/assets/pizza-margherita.jpg";
import pizzaPepperoni from "@/assets/pizza-pepperoni.jpg";
import burger from "@/assets/burger.jpg";
import fries from "@/assets/fries.jpg";
import salad from "@/assets/salad.jpg";
import soda from "@/assets/soda.jpg";

export const Route = createFileRoute("/")({ component: Cashier });

type MenuItem = { id: string; name: string; price: number; image: string; category: string };

const MENU: MenuItem[] = [
  { id: "1", name: "Margherita Pizza", price: 12.99, image: pizzaMargherita, category: "Pizza" },
  { id: "2", name: "Pepperoni Pizza", price: 14.99, image: pizzaPepperoni, category: "Pizza" },
  { id: "3", name: "Cheeseburger",    price: 9.99,  image: burger,           category: "Burgers" },
  { id: "4", name: "French Fries",    price: 4.5,   image: fries,            category: "Sides" },
  { id: "5", name: "Garden Salad",    price: 7.5,   image: salad,            category: "Sides" },
  { id: "6", name: "Cola",            price: 2.99,  image: soda,             category: "Drinks" },
];

type CartLine = MenuItem & { qty: number };

function Cashier() {
  const [cart, setCart] = useState<CartLine[]>([]);

  const add = (item: MenuItem) =>
    setCart((c: CartLine[]) => {
      const existing = c.find((l: CartLine) => l.id === item.id);
      return existing
        ? c.map((l: CartLine) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l))
        : [...c, { ...item, qty: 1 }];
    });

  const remove = (id: string) => setCart((c: CartLine[]) => c.filter((l: CartLine) => l.id !== id));
  const total = cart.reduce((s: number, l: CartLine) => s + l.price * l.qty, 0);

  return (
    <div className="pos-layout">
      <main className="menu-section">
        <h1 className="section-title">Cashier — Menu</h1>
        <div className="menu-grid">
          {MENU.map((item) => (
            <button key={item.id} className="menu-item" onClick={() => add(item)}>
              <img src={item.image} alt={item.name} loading="lazy" width={512} height={512} className="menu-item-img" />
              <div className="menu-item-body">
                <div className="menu-item-name">{item.name}</div>
                <div className="menu-item-price">${item.price.toFixed(2)}</div>
              </div>
            </button>
          ))}
        </div>
      </main>

      <aside className="cart-section">
        <h2 className="section-title">Order</h2>
        <div className="cart-list">
          {cart.length === 0 && <p className="cart-empty">No items yet</p>}
          {cart.map((l: CartLine) => (
            <div key={l.id} className="cart-line">
              <img src={l.image} alt={l.name} className="cart-thumb" />
              <div className="cart-line-info">
                <div>{l.name}</div>
                <small>{l.qty} × ${l.price.toFixed(2)}</small>
              </div>
              <button className="cart-remove" onClick={() => remove(l.id)}>×</button>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <span>Total</span><strong>${total.toFixed(2)}</strong>
        </div>
        <button className="checkout-btn" disabled={cart.length === 0}>Checkout</button>
      </aside>
    </div>
  );
}
