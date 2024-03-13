"use client";

import { Dispatch, FC, SetStateAction, createContext, useContext, useState } from "react";
import { Locale, defaultLocale } from ".";

const LocaleContext = createContext<Locale>(defaultLocale);

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
	return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export default LocaleProvider;
