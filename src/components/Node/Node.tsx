import { red } from "@material-ui/core/colors";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { loader } from "graphql.macro";
import React from "react";
import chromeLogo from "../../assets/chrome.svg";
import firefoxLogo from "../../assets/firefox.svg";
import unknownLogo from "../../assets/unknown.svg";
import NodeType from "../../models/node";
import { ReactComponent as RightIcon } from "../../assets/icons/arrow.svg";
import { Status } from "../Status";
import "./Node.css";

// Not using this query for getting a single node
// Because in Nodes.tsx we get all the attrs of all the existing Nodes
// Incase we might need this leaving it here
// eslint-disable-next-line
const NODE_QUERY = loader("../../graphql/node.gql");

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

export default function NodeComponent(props: {
	node: NodeType;
	index: number;
}) {
	const { node, index } = props;
	// console.log(node);

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
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	let details = (
		<div>
			<p>browserTimeout: 0</p>
			<p>debug: false</p>
			<p>host: 192.168.43.159</p>
			<p>port: 25052</p>
			<p>role: node</p>
			<p>timeout: 1800</p>
			<p>cleanUpCycle: 5000</p>
			<p>maxSession: 5</p>
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

	let logos = (
		<div>
			id : {node.id}, OS : {/* node.platform */ "LINUX"}
			{node.capabilities?.map((c) => (
				<div key={c.serverConfigUUID}>
					{[...Array(c.maxInstances)].map((_, i) => (
						<img
							key={i}
							alt={c.browserName}
							// data-debug={console.log(c)}
							src={getLogo(c.browserName)}
							width="16"
							height="16"
							title={JSON.stringify(c)}
							style={{ float: "left" }}
						/>
					))}{" "}
				</div>
			))}
		</div>
	);
	return (
		<tr>
			<th scope="row">3</th>
			<td>Larry the Bird</td>
			{/* <td colSpan={2}>Larry the Bird</td> */}
			<td>@twitter</td>
			<td>@mdo</td>
			<td>
				<Status state="idle" />
			</td>
			<td>
				<RightIcon />
			</td>
		</tr>
	);
}
