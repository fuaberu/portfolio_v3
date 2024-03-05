interface Props {
	title: string;
}

export const SectionTitle = ({ title }: Props) => {
	return (
		<div className="bg-gradient-to-r from-teal-400 to-teal-700 bg-clip-text text-transparent dark:from-teal-100 dark:to-teal-500">
			<h2 id="skills" className="text-center text-3xl font-bold md:text-6xl">
				{title}
			</h2>
		</div>
	);
};
