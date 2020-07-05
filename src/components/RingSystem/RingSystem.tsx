/** @jsx _jsx */

import { css, jsx as _jsx } from "@emotion/core";
import Tippy from "@tippyjs/react";
import React, { useEffect, useState } from "react";
import { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css"; // required for styling tippy
import { ReactComponent as CircleIcon } from "../../assets/icons/circle.svg";
import StateType from "../../models/rings";
import Ring from "./Ring/Ring";
import { LABELS } from "../Status";

const RingSystem = ({ state: { count, progresses } }: { state: StateType }) => {
	const radius = 112;
	const stroke = 12;
	let normalizedRadius = radius - stroke;

	// NO state required as it should reset every render
	let offsets = [0];

	let [index, setIndex] = useState(-1);

	const [istippyVisible, setVisible] = useState(false);
	const showTippy = () => {
		// if not visible show to prevent multiple renders
		if (!istippyVisible) setVisible(true);
	};
	const hideTippy = () => {
		// if visible hide to prevent multiple renders
		if (istippyVisible) setVisible(false);
	};

	useEffect(() => {
		if (index === -1) return;
		console.log(index, Object.keys(progresses).length);
		if (index === Object.keys(progresses).length) {
			parentCB(`${100 - totalProgress}% unknown`);
			return;
		}
		parentCB(`${progresses[index].progress}% ${LABELS[index]}`);
	}, [index]);

	let [currentTooltipContent, setcurrentTooltipContent] = useState("loading");

	const parentCB = (child: string) => {
		if (currentTooltipContent != child) setcurrentTooltipContent(child);
	};

	let totalProgress = 0;
	Object.values(progresses).forEach((x) => {
		totalProgress += x.progress;
		offsets.push(totalProgress);
	});
	offsets.push(100);

	const handleTippy = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const [x2, y2] = [evt.nativeEvent.offsetX, evt.nativeEvent.offsetY];
		const [x1, y1] = [radius, radius];
		const distsquared = distSq(x1, y1, x2, y2);

		// covers more area to maximize visibile time
		if (
			distsquared < radius ** 2 &&
			distsquared > (normalizedRadius - stroke) ** 2
		) {
			// TODO get current hovered arc
			// Object.keys(progresses).forEach((x) => {
			// 	const progress = progresses[parseInt(x)];
			// 	console.log(progress.progress);
			// });
			let angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
			angle += 90;
			if (angle < 0) {
				angle += 360;
			}
			const offAngles = offsets.map((o) => (o * 360) / 100);

			// could be more efficient like binary search
			// but not really needed
			// as number of rings are gauranteed to be <= 5
			// So worst case is 5 iterations o(n)
			let currentIndex = -1;
			for (var i = 1; i <= offAngles.length; i++) {
				// >= and <= so we will not get -1 at 0
				if (offAngles[i - 1] <= angle && offAngles[i] >= angle) {
					currentIndex = i - 1;
					break;
				}
			}
			if (index !== currentIndex) {
				setIndex(currentIndex);
			}

			showTippy();
		} else hideTippy();
	};

	/* Square of dist between two coords */
	const distSq = (x1: number, y1: number, x2: number, y2: number) => {
		return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
	};

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
				onMouseMove={(ev) => handleTippy(ev)}
				// onMouseOut={hideTippy}
				onMouseLeave={hideTippy}
			>
				<Tippy
					visible={istippyVisible}
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
				{[...Array(count)].map((_, i) => (
					<Ring
						key={i}
						id={`ring-${i}`}
						color={progresses[i].color}
						offset={offsets[i]}
						radius={radius}
						progress={progresses[i].progress}
						stroke={stroke}
						parentCB={parentCB}
					/>
				))}
				{/* Residual ring i.e. left out 100 - percent */}
				{/* Or we can show a full circle as the background i.e. at the very beginning */}
				<Ring
					id={"ring-unknown"}
					color={"#707070"}
					offset={totalProgress}
					radius={radius}
					progress={100 - totalProgress}
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
								text={LABELS[i]}
							/>
						);
						return ret;
					})}
					<ColorInfo
						id={`info-icon-noman`}
						color={"#707070"}
						progress={100 - totalProgress}
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
			<React.Fragment>
				{progress <= 0 ? (
					// nothing if progress is full
					// This will be the one returned always for the grid
					<React.Fragment></React.Fragment>
				) : (
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
				)}
			</React.Fragment>
		);
	}
);
