"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
	if (/defaultProps/.test(args[0])) return;
	error(...args);
};

interface Props {
	data: { key: string; value: number }[];
}

export function LineStats({ data }: Props) {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart data={data}>
				<XAxis dataKey="key" stroke="#888888" fontSize={12} />
				<YAxis stroke="#888888" fontSize={12} />
				<Bar dataKey="value" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
			</BarChart>
		</ResponsiveContainer>
	);
}
