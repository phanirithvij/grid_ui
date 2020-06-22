import { Close, MoreVert } from "@material-ui/icons";
import { loader } from "graphql.macro";
import React from "react";
import { Card } from "react-materialize";
import chromeLogo from "../images/chrome.svg";
import firefoxLogo from "../images/firefox.svg";
import unknownLogo from "../images/unknown.svg";
import NodeType from "../models/node";
import "./Node.css";

// Not using this query for getting a single node
// Because in Nodes.tsx we get all the attrs of all the existing Nodes
// Incase we might need this leaving it here
// eslint-disable-next-line
const NODE_QUERY = loader("../graphql/node.gql");

export default function NodeComponent(props: { node: NodeType }) {
	const { node } = props;
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

	return (
		// <Col m={6} s={6}>
		<Card
			closeIcon={<Close />}
			reveal={
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
			}
			revealIcon={<MoreVert />}
			title="DefaultRemoteProxy (version : 3.141.59)"
		>
			<div>
				id : {node.id}, OS : {/* node.platform */ "LINUX"}
				{node.capabilities?.map((c) => (
					<p key={c.serverConfigUUID}>
						v:{" "}
						{[...Array(c.maxInstances)].map((_, i) => (
							<img
								key={i}
								alt={c.browserName}
								// data-debug={console.log(c)}
								src={getLogo(c.browserName)}
								width="16"
								height="16"
								title={JSON.stringify(c)}
							/>
						))}{" "}
					</p>
				))}
				{/* <a href="#">This is a link</a> */}
			</div>
		</Card>
	);
}
