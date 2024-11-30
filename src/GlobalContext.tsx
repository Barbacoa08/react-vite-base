import { createContext, useContext } from "react";

export interface GlobalContextType {
	name: string;
	setName: (name: string) => void;
}

interface GlobalContextProviderProps {
	children: React.ReactNode;
	value: GlobalContextType;
}

const GlobalContext = createContext<GlobalContextType>({
	name: "",
	setName: () => null,
});

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
	children,
	value,
}) => {
	return (
		<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => {
	const context = useContext(GlobalContext);

	if (context === undefined) {
		throw new Error(
			"useGlobalContext must be used within a GlobalContextProvider",
		);
	}

	return context;
};
