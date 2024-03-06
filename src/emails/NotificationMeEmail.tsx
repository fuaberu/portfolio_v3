import { Body, Container, Head, Hr, Html, Img, Preview, Text } from "@react-email/components";

interface Props {
	name: string;
	email: string;
	message: string;
}

export const NotificationMeEmail = ({ name, email, message }: Props) => {
	return (
		<Html lang="en">
			<Head />
			<Preview>{name} has sent you a message</Preview>
			<Body style={main}>
				<Container style={container}>
					{process.env.NEXT_PUBLIC_SITE_URL && (
						<Img
							src={`${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`}
							width="60"
							height="60"
							alt="Logo"
							style={logo}
						/>
					)}

					<Text style={paragraph}>Name: {name},</Text>
					<Text style={paragraph}>Email: {email}</Text>
					<Text style={paragraph}>Message: {message}</Text>
					<Hr style={hr} />
				</Container>
			</Body>
		</Html>
	);
};

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
};

const logo = {
	margin: "0 auto",
};

const paragraph = {
	fontSize: "16px",
	lineHeight: "26px",
};

const hr = {
	borderColor: "#cccccc",
	margin: "20px 0",
};
