interface Props {
	title: string;
}

export const SectionTitle = ({ title }: Props) => {
	return (
		<div className="bg-gradient-to-r from-teal-200 to-blue-600 bg-clip-text text-transparent">
			<h2 id="skills" className="text-center text-3xl font-bold md:text-6xl">
				{title}
			</h2>
		</div>
	);
};
