/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ReactComponent as CircleIcon } from "../assets/icons/circle.svg";

enum StatusType {
	running = "running",
	idle = "idle",
	unresponsive = "unresponsive",
	unknown = "unknown",
}

const colors: { [key: string]: string } = {
	running: "#3BEC70",
	idle: "#E4D400",
	unresponsive: "#E40000",
	unknown: "#8b8b8b",
};

export const Status = ({ state }: { state: StatusType }) => {
	return (
		<div className="row" style={{ overflow: "auto" }}>
			<div className="col-1" style={{ alignSelf: "center" }}>
				<CircleIcon
					css={css`
						fill: ${colors[state]};
						float: left;
					`}
				/>
			</div>
			<div className="col-6" style={{ float: "left" }}>
				{state}
			</div>
		</div>
	);
};

export { StatusType };
