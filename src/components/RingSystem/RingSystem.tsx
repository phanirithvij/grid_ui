/** @jsx _jsx */

import { css, jsx as _jsx } from "@emotion/core";
import Tippy from "@tippyjs/react";
import React, { useState } from "react";
import { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css"; // required for styling tippy
import { ReactComponent as CircleIcon } from "../../assets/icons/circle.svg";
import StateType from "../../models/rings";
import Ring from "../Ring/Ring";

const RingSystem = ({ state: { count, progresses } }: { state: StateType }) => {
	const radius = 112;
	const stroke = 12;
	let normalizedRadius = radius - stroke;
	let prevProgress = 0;

	const [visible, setVisible] = useState(false);
	const showTippy = () => {
		// if not visible show to prevent multiple renders
		if (!visible) setVisible(true);
	};
	const hideTippy = () => {
		// if visible hide to prevent multiple renders
		if (visible) setVisible(false);
	};

	let [currentTooltipContent, setcurrentTooltipContent] = useState("loading");

	const parentCB = (child: string) => {
		if (currentTooltipContent != child) setcurrentTooltipContent(child);
	};

	const handleTippy = (
		evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
		child: string
	) => {
		let [x2, y2] = [evt.nativeEvent.offsetX, evt.nativeEvent.offsetY];
		let distsquared = distSq(radius, radius, x2, y2);

		// covers more area to maximize visibile time
		if (
			distsquared < radius ** 2 &&
			distsquared > (normalizedRadius - stroke) ** 2
		)
			showTippy();
		else hideTippy();

		parentCB(child);
	};

	/* Square of dist between two coords */
	const distSq = (x1: number, y1: number, x2: number, y2: number) => {
		return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
	};

	let totalProgress = 0;
	Object.values(progresses).forEach((x) => {
		totalProgress += x.progress;
	});

	// can be removed as progress will not be > 100
	// because we calculate progress from (n / total nodes) which will all add up
	if (totalProgress > 100) {
		// checks if progress > 100 then makes it 100
		Object.keys(progresses).forEach((x) => {
			const idx = parseInt(x);
			progresses[idx].progress /= totalProgress;
			progresses[idx].progress = Math.floor(progresses[idx].progress * 100);
		});
		totalProgress = 100;
	}

	return (
		<div
			css={css`
				display: flex;
				justify-content: space-between;
			`}
		>
			<div
				css={css`
					width: 40%;
					position: relative;
					height: ${radius * 2}px;
					width: ${radius * 2}px;
					min-width: ${radius * 2}px;
				`}
				onMouseMove={(ev) => handleTippy(ev, "Pooooo")}
				// onMouseOut={hideTippy}
				onMouseLeave={hideTippy}
			>
				<Tippy
					visible={visible}
					followCursor={true}
					plugins={[followCursor]}
					content={currentTooltipContent}
					duration={100}
				>
					<div></div>
				</Tippy>
				{/* https://stackoverflow.com/a/23714832/8608146 */}
				<div
					css={css`
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					`}
				>
					{100 - totalProgress}% free
				</div>
				{[...Array(count)].map((_, i) => {
					const ret = (
						<Ring
							key={i}
							id={`ring-${i}`}
							color={progresses[i].color}
							offset={prevProgress}
							radius={radius}
							progress={progresses[i].progress}
							stroke={stroke}
							parentCB={parentCB}
						/>
					);
					prevProgress += progresses[i].progress;
					return ret;
				})}
				{(() => {
					if (prevProgress > 100) prevProgress = 100;
				})()}
				{/* Residual ring i.e. left out 100 - percent */}
				{/* Or we can show a full circle as the background i.e. at the very beginning */}
				<Ring
					color={"#707070"}
					offset={prevProgress}
					id={"ring-unknown"}
					radius={radius}
					progress={100 - prevProgress}
					stroke={stroke}
					parentCB={parentCB}
				/>
			</div>
			<div
				css={css`
					width: 60%;
					position: relative;
				`}
			>
				<div
					css={css`
						width: 100%;
						top: 50%;
						// left: -10%;
						position: absolute;
						transform: translate(-10%, -50%);
					`}
					style={{ alignSelf: "center" }}
				>
					{(() => {
						if (count > 7) count = 7;
					})()}
					{[...Array(count)].map((_, i) => {
						const ret = (
							<ColorInfo
								key={i}
								id={`info-icon-${i}`}
								color={progresses[i].color}
								progress={progresses[i].progress}
								text={"Color #" + i}
							/>
						);
						return ret;
					})}
					<ColorInfo
						id={`info-icon-noman`}
						color={"#707070"}
						progress={100 - prevProgress}
						text={"unknown"}
					/>
				</div>
			</div>
		</div>
	);
};

export default RingSystem;
export { ColorInfo };

// TODO https://reactjs.org/docs/react-api.html#reactmemo
// Look at isequal
const ColorInfo = React.memo(
	(props: { color: string; text: string; id: string; progress: number }) => {
		const { color, text, id, progress } = props;

		return (
			<div
				css={css`
					height: 20px;
					position: relative;
				`}
			>
				<Tippy content={`${progress}%`} placement="left">
					<CircleIcon
						id={id}
						css={css`
							fill: ${color};
							float: left;
							height: 100%;
							position: absolute;
						`}
					/>
				</Tippy>
				<div
					css={css`
						left: 30px;
						position: absolute;
						height: 100%;
						top: 15%;
						transform: translate(-10%, -30%);
					`}
				>
					{text}
				</div>
			</div>
		);
	}
);
