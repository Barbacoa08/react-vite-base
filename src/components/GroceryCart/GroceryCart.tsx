import { useCallback, useMemo, useState } from "react";
import "./GroceryCart.css";

type GroceryItemType = "fruit" | "snack";
interface GroceryItem {
	name: string;
	quantity: number;
	maxQuantity?: number;
	type: GroceryItemType;
}
const StartingGroceryItems: GroceryItem[] = [
	{
		name: "Bananas",
		quantity: 10,
		maxQuantity: 20,
		type: "fruit",
	},
	{
		name: "Pears",
		quantity: 30,
		maxQuantity: 50,
		type: "fruit",
	},
	{
		name: "CheezeIts",
		quantity: 13,
		maxQuantity: 30,
		type: "snack",
	},
	{
		name: "Gushers",
		quantity: 1,
		maxQuantity: 200,
		type: "snack",
	},
];

export const GroceryCart = () => {
	const [cart, setCart] = useState<GroceryItem[]>([]);
	const [items, setItems] = useState<GroceryItem[]>(StartingGroceryItems);

	const fruits = useMemo(
		() => items.filter((i) => i.type === "fruit"),
		[items],
	);

	const snacks = useMemo(
		() => items.filter((i) => i.type === "snack"),
		[items],
	);

	const handleAddToCart = useCallback(
		(name: string) => {
			const selectedItemIndex = items.findIndex((i) => i.name === name);
			if (items[selectedItemIndex].quantity <= 0) {
				alert("you can't take a zero items");
				return;
			}

			// take one
			const updatedSelection = [...items];
			updatedSelection[selectedItemIndex].quantity--;
			setItems(updatedSelection);

			// add to cart
			const cartItemIndex = cart.findIndex((c) => c.name === name);
			if (cartItemIndex < 0) {
				setCart([
					...cart,
					{
						name,
						quantity: 1,
						type: updatedSelection[selectedItemIndex].type,
					} satisfies GroceryItem,
				]);
			} else {
				const updatedCart = [...cart];
				updatedCart[cartItemIndex].quantity++;

				setCart(updatedCart);
			}
		},
		[cart, items],
	);

	const handleRemoveFromCart = useCallback(
		(name: string) => {
			const cartItemIndex = cart.findIndex((i) => i.name === name);
			if (cart[cartItemIndex].quantity === 1) {
				setCart(cart.filter((i) => i.name !== name));
			} else {
				const updatedCart = [...cart];
				updatedCart[cartItemIndex].quantity--;
				setCart(updatedCart);
			}

			const selectedItemIndex = items.findIndex((i) => i.name === name);
			const updatedItems = [...items];
			updatedItems[selectedItemIndex].quantity++;
		},
		[cart, items],
	);

	const handleCheckout = useCallback(() => setCart([]), []);

	const handleRestock = useCallback(() => {
		const updatedItems: GroceryItem[] = [];

		for (const i of items) {
			const itemToUpdate: GroceryItem = { ...i };

			const startingItem = StartingGroceryItems.find(
				(i) => i.name === itemToUpdate.name,
			) as GroceryItem;
			itemToUpdate.quantity = Math.min(
				itemToUpdate.quantity + startingItem.quantity,
				startingItem.maxQuantity as number,
			);

			updatedItems.push(itemToUpdate);
		}

		setItems(updatedItems);
	}, [items]);

	return (
		<main className="grocerycart-container">
			<h1>Grocery Cart</h1>

			<section className="selection">
				<AvailableItems
					title="Fruits"
					items={fruits}
					handleAddToCart={handleAddToCart}
				/>

				<AvailableItems
					title="Snacks"
					items={snacks}
					handleAddToCart={handleAddToCart}
				/>
			</section>

			<section>
				<h2>Checkout area</h2>

				{cart.map((c) => (
					<div key={`checkout-${c.name}`}>
						<span>{`${c.name}: ${c.quantity} in Cart`}</span>

						<button
							className="icon-button"
							type="button"
							aria-label={`remove one ${c.name}`}
							onClick={() => handleRemoveFromCart(c.name)}
						>
							❌
						</button>
					</div>
				))}

				<div>
					<h3>{cart.length ? "Complete checkout?" : "No items selected"}</h3>

					<button
						type="button"
						disabled={cart.length === 0}
						onClick={handleCheckout}
					>
						submit checkout
					</button>
				</div>
			</section>

			<section>
				<h2>Admin tools</h2>

				<button type="button" onClick={handleRestock}>
					RESTOCK
				</button>
			</section>
		</main>
	);
};

interface AvailableItemsProps {
	title: string;
	items: GroceryItem[];

	handleAddToCart: (name: string) => void;
}
const AvailableItems = ({
	title,
	items,
	handleAddToCart,
}: AvailableItemsProps) => (
	<div className="grocery-type">
		<h2>{title}</h2>

		{items.map((i) => (
			<div key={`${title}-${i.name}`}>
				<span>{`${i.name}: ${i.quantity} remaining`}</span>

				<button
					className="icon-button"
					type="button"
					aria-label={`add one ${i.name}`}
					disabled={i.quantity <= 0}
					onClick={() => handleAddToCart(i.name)}
				>
					➕
				</button>
			</div>
		))}
	</div>
);
