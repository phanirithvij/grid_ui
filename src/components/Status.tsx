/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ReactComponent as CircleIcon } from "../assets/icons/circle.svg";
import Tippy from "@tippyjs/react";
import React from "react";

/**
 * StatusTypes
 */
export enum StatusType {
	/** All the running nodes */
	running,
	/** All the idle but alive nodes */
	idle,
	/** All the unresponsive possibly down nodes */
	unresponsive,
	/** All the down nodes */
	down,
}

export const LABELS = ["running", "idle", "unresponsive", "down"];

export const colors: { [key in StatusType]: string } = {
	[StatusType.running]: "#3BEC70",
	[StatusType.idle]: "#E4D400",
	[StatusType.down]: "#E40000",
	[StatusType.unresponsive]: "#8b8b8b",
};

export const Status = React.memo((props: { state: StatusType }) => {
	let { state } = props;

	return (
		<div className="row" style={{ overflow: "auto" }}>
			<div className="col-1" style={{ alignSelf: "center" }}>
				<Tippy content={LABELS[state]}>
					<CircleIcon
						css={css`
							fill: ${colors[state]};
							float: left;
						`}
					/>
				</Tippy>
			</div>
			<div className="col-6" style={{ float: "left" }}>
				{LABELS[state]}
			</div>
		</div>
	);
});
