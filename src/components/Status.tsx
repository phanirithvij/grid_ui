/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ReactComponent as CircleIcon } from "../assets/icons/circle.svg";
import Tippy from "@tippyjs/react";

enum StatusType {
	running,
	idle,
	unresponsive,
	unknown,
}

const LABELS = ["running", "idle", "unresponsive", "unknown"];

const colors: { [key in StatusType]: string } = {
	[StatusType.running]: "#3BEC70",
	[StatusType.idle]: "#E4D400",
	[StatusType.unknown]: "#E40000",
	[StatusType.unresponsive]: "#8b8b8b",
};

export const Status = ({ state }: { state: StatusType }) => {
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
};

export { StatusType, colors, LABELS };
