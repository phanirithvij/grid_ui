/** @jsx _jsx */
import { css, jsx as _jsx } from "@emotion/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { loader } from "graphql.macro";
import React from "react";
import chromeLogo from "../../../assets/chrome.svg";
import firefoxLogo from "../../../assets/firefox.svg";
import unknownLogo from "../../../assets/unknown.svg";
import NodeType from "../../../models/node";
// import "./Node.css";

// Not using this query for getting a single node
// Because in Nodes.tsx we get all the attrs of all the existing Nodes
// Incase we might need this leaving it here
// eslint-disable-next-line
const NODE_QUERY = loader("../../../graphql/node.gql");

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: 345,
		},
		media: {
			height: 0,
			paddingTop: "56.25%", // 16:9
		},
		expand: {
			transform: "rotate(0deg)",
			marginLeft: "auto",
			transition: theme.transitions.create("transform", {
				duration: theme.transitions.duration.shortest,
			}),
		},
		expandOpen: {
			transform: "rotate(180deg)",
		},
		avatar: {
			backgroundColor: red[500],
		},
	})
);

export default function NodeInfo(props: {
	node: NodeType | undefined;
	match?: {
		isExact: boolean;
		params: { id: string };
		path: string;
		url: string;
	};
}) {
	const index = parseInt(props.match ? props.match.params.id : "0");
	const node = props.node;

	function getLogo(browserName: string): string {
		switch (browserName) {
			case "firefox":
				return firefoxLogo;
			case "chrome":
				return chromeLogo;
			// TODO other logos
			default:
				// TODO make an unknown logo image
				return unknownLogo;
		}
	}

	const classes = useStyles();
	// By default it will be expanded
	const [expanded, setExpanded] = React.useState(true);

	const handleExpandClick = () => setExpanded((exp) => !exp);

	let rawDetails = (
		<div>
			<pre>browserTimeout: 0</pre>
			<pre>debug: false</pre>
			<pre>host: 192.168.43.159</pre>
			<pre>port: 25052</pre>
			<pre>role: node</pre>
			<pre>timeout: 1800</pre>
			<pre>cleanUpCycle: 5000</pre>
			<pre>maxSession: 5</pre>
			<p>
				{
					"capabilities: Capabilities {browserName: firefox, marionette: true, maxInstances: 5, platform: LINUX, platformName: LINUX, seleniumProtocol: WebDriver, server:CONFIG_UUID: 028e470d-4b9a-4436-8d41-922...}"
				}
			</p>
			<p>
				{
					"capabilities: Capabilities {browserName: chrome, maxInstances: 5, platform: LINUX, platformName: LINUX, seleniumProtocol: WebDriver, server:CONFIG_UUID: acd83135-53d8-4f8e-9d4c-e92...}"
				}
			</p>
			<p>downPollingLimit: 2</p>
			<p>hub: http://localhost:4444</p>
			<p>id: http://192.168.43.159:25052</p>
			<p>nodePolling: 5000</p>
			<p>nodeStatusCheckTimeout: 5000</p>
			<p>proxy: org.openqa.grid.selenium.proxy.DefaultRemoteProxy</p>
			<p>register: true</p>
			<p>registerCycle: 5000</p>
			<p>remoteHost: http://192.168.43.159:25052</p>
			<p>unregisterIfStillDownAfter: 60000</p>
		</div>
	);

	if (node === undefined) return <React.Fragment></React.Fragment>;

	console.log(node);

	let logos = (
		<div>
			id : {node.id}, OS : {/* node.platform */ "LINUX"}
			{node.capabilities?.map((c) => (
				<div key={c.browserName}>
					{[...Array(c.slots)].map((_, i) => (
						<img
							key={i}
							alt={c.browserName}
							src={getLogo(c.browserName)}
							width="16"
							height="16"
							title={JSON.stringify(c)}
							style={{ float: "left" }}
						/>
					))}
				</div>
			))}
		</div>
	);

	return (
		<Card
			className={classes.root}
			css={css`
				padding-top: 30px;
				padding-right: 1vw;
				padding-left: 1vw;
				transform: translate(2vw, -21vh);
			`}
		>
			<CardHeader
				// avatar={
				// 	<Avatar aria-label="node" className={classes.avatar}>
				// 		{index}
				// 	</Avatar>
				// }
				action={
					<IconButton aria-label="close">
						<CloseIcon />
					</IconButton>
				}
				title={`DefaultRemoteProxy (version : TODO get selenium version from server)`}
				subheader="TODO: last active time"
			/>
			<CardContent>
				{/* <Typography variant="body2" color="textSecondary" component="p">
					// TODO show important info for this node
				</Typography> */}
				{logos}
			</CardContent>
			<CardActions disableSpacing>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>{rawDetails}</CardContent>
			</Collapse>
		</Card>
	);
}
