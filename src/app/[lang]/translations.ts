import { Locale } from "@/lib/I18n";
import "server-only";

const dictionaries = {
	en: () => import("../../translations/en.json").then((module) => module.default),
	pt: () => import("../../translations/pt.json").then((module) => module.default),
	jp: () => import("../../translations/jp.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
