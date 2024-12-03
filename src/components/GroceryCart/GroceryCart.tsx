import { useCallback, useState } from "react";
import "./GroceryCart.css";

interface GroceryItem {
	name: string;
	quantity: number;
}
const AvailableFruits: GroceryItem[] = [
	{
		name: "Bananas",
		quantity: 10,
	},
	{
		name: "Pears",
		quantity: 30,
	},
];
const AvailableSnacks: GroceryItem[] = [
	{
		name: "CheezeIts",
		quantity: 13,
	},
	{
		name: "Gushers",
		quantity: 1,
	},
];

// TODO: "restock" (set numbers back to base, or increment by "Available*")
// TODO: checkout: clear cart

export const GroceryCart = () => {
	const [cart, setCart] = useState<GroceryItem[]>([]);
	const [fruits, setFruits] = useState<GroceryItem[]>(AvailableFruits);
	const [snacks, setSnacks] = useState<GroceryItem[]>(AvailableSnacks);

	// TODO: add to cart
	const handleAddToCart = useCallback(
		(
			name: string,
			items: GroceryItem[],
			setItems: React.Dispatch<React.SetStateAction<GroceryItem[]>>,
		) => {
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
					} satisfies GroceryItem,
				]);
			} else {
				const updatedCart = [...cart];
				updatedCart[cartItemIndex].quantity++;

				setCart(updatedCart);
			}
		},
		[cart],
	);

	// TODO: remove item from cart
	const handleRemoveFromCart = useCallback(() => {
		alert("not implemented");
		throw new Error("not implemented");
	}, []);

	return (
		<main className="grocerycart-container">
			<h1>Grocery Cart</h1>

			<section className="selection">
				<AvailableItems
					title="Fruits"
					items={fruits}
					setItems={setFruits}
					handleAddToCart={handleAddToCart}
				/>

				<AvailableItems
					title="Snacks"
					items={snacks}
					setItems={setSnacks}
					handleAddToCart={handleAddToCart}
				/>
			</section>

			<section>
				<h2>Checkout area</h2>

				{cart.map((c) => (
					<div key={`checkout-${c.name}-${c.quantity}`}>
						<span>
							{c.name}: {c.quantity} in Cart
						</span>

						<button
							className="icon-button"
							type="button"
							aria-label={`remove one ${c.name}`}
							onClick={handleRemoveFromCart}
						>
							❌
						</button>
					</div>
				))}
			</section>
		</main>
	);
};

interface AvailableItemsProps {
	title: string;
	items: GroceryItem[];
	setItems: React.Dispatch<React.SetStateAction<GroceryItem[]>>;
	handleAddToCart: (
		name: string,
		items: GroceryItem[],
		setItems: React.Dispatch<React.SetStateAction<GroceryItem[]>>,
	) => void;
}
const AvailableItems = ({
	title,
	items,
	setItems,
	handleAddToCart,
}: AvailableItemsProps) => {
	return (
		<div className="grocery-type">
			<h2>{title}</h2>

			{items.map((i) => (
				<div key={`${title}-${i.name}-${i.quantity}`}>
					<span>
						{i.name}: {i.quantity} remaining
					</span>

					<button
						className="icon-button"
						type="button"
						aria-label={`add one ${i.name}`}
						disabled={i.quantity <= 0}
						onClick={() => handleAddToCart(i.name, items, setItems)}
					>
						➕
					</button>
				</div>
			))}
		</div>
	);
};
