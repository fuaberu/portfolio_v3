import { Body, Container, Head, Hr, Html, Img, Preview, Text } from "@react-email/components";

interface Props {
	name: string;
}

export const ConfirmationEmail = ({ name }: Props) => {
	return (
		<Html lang="en">
			<Head />
			<Preview>I will get back to you as soon as I can. Kevin Fabel</Preview>
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

					<Text style={paragraph}>Hello {name},</Text>
					<Text style={paragraph}>Thanks so much for reaching out!</Text>
					<Text style={paragraph}>
						This auto-reply is just to let you know that I have recieved your message and will get
						back to you as soon as I can.
					</Text>
					<Text style={paragraph}>I look forward to chatting soon!</Text>
					<Text style={paragraph}>Best regards,</Text>
					<Text style={paragraph}>Kevin Alves Fabel</Text>
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
