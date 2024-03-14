"use client";

import {
	Dispatch,
	FC,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { Locale, defaultLocale } from ".";

const LocaleContext = createContext<{
	locale: Locale;
	setLocale: Dispatch<SetStateAction<Locale>>;
}>({ locale: defaultLocale, setLocale: () => {} });

export const useLocale = () => {
	const context = useContext(LocaleContext);

	if (!context) {
		throw new Error("useLocale must be used within the locale provider");
	}

	return context;
};

interface ProviderProps {
	children: React.ReactNode;
	value: Locale;
}

const LocaleProvider: FC<ProviderProps> = ({ children, value }) => {
	const [locale, setLocale] = useState<Locale>(value);

	return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
};

export default LocaleProvider;
