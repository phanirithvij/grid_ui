/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ReactComponent as CircleIcon } from "../assets/icons/circle.svg";

const colors: { [key: string]: string } = {
	running: "#3BEC70",
	idle: "#E4D400",
	unresponsive: "#E40000",
};

export const Status = ({ state }: { state: string }) => {
	return (
		<div className="row">
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
