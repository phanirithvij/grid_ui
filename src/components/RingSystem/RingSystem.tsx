/** @jsx _jsx */

import { css, jsx as _jsx } from "@emotion/core";
import Tippy from "@tippyjs/react";
import React, { useState } from "react";
import "tippy.js/dist/tippy.css"; // optional for styling
import { ReactComponent as CircleIcon } from "../../assets/icons/circle.svg";
import StateType from "../../models/rings";
import Ring, { ToolTip } from "../Ring/Ring";
import "./dot.css";

export default function RingSystem({
	state: { count, progresses },
}: {
	state: StateType;
}) {
	const radius = 100;
	const stroke = 10;
	let normalizedRadius = radius - stroke;
	let prevProgress = 0;

	let [currentTooltipChild, setcurrentTooltipChild] = useState(
		<React.Fragment></React.Fragment>
	);

	const parentCB = (child: JSX.Element) => {
		setcurrentTooltipChild(child);
	};

	function showTooltip(
		evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
		child: JSX.Element
	) {
		let tooltip = document.getElementById("tooltip") as HTMLDivElement;
		tooltip.style.left = evt.nativeEvent.offsetX - 7 + "px";
		tooltip.style.top = evt.nativeEvent.offsetY - 40 + "px";
		let [x2, y2] = [evt.nativeEvent.offsetX, evt.nativeEvent.offsetY];
		let distsquared = distSq(radius, radius, x2, y2);
		tooltip.style.display = "none";
		// console.log(
		// 	distsquared,
		// 	(normalizedRadius - stroke) ** 2,
		// 	radius ** 2,
		// 	distsquared < radius ** 2,
		// 	distsquared > (normalizedRadius - stroke) ** 2
		// );
		if (
			distsquared < radius ** 2 &&
			distsquared > (normalizedRadius - stroke) ** 2
		) {
			tooltip.style.display = "block";
			showPoint(evt);
		}
		parentCB(child);
	}

	function showPoint(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		// Add a dot to follow the cursor
		let dot = document.createElement("div");
		dot.className = "dot";
		dot.style.left = evt.pageX + "px";
		dot.style.top = evt.pageY + "px";
		document.body.appendChild(dot);
	}

	function distSq(x1: number, y1: number, x2: number, y2: number) {
		return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
	}

	// eslint-disable-next-line
	function hideTooltip() {
		var tooltip = document.getElementById("tooltip") as HTMLDivElement;
		tooltip.style.display = "none";
	}

	let totalProgress = 0;
	Object.values(progresses).forEach((x) => {
		totalProgress += x.progress;
	});
	if (totalProgress > 100) {
		Object.keys(progresses).forEach((x) => {
			const idx = parseInt(x);
			progresses[idx].progress /= totalProgress;
			progresses[idx].progress = Math.round(progresses[idx].progress * 100);
		});
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
				onMouseMove={(ev) => showTooltip(ev, <div>{"Pooooo"}</div>)}
			>
				<ToolTip>{currentTooltipChild}</ToolTip>
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
				{/* Residual ring i.e. 100 - percent */}
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
}

export function ColorInfo(props: {
	color: string;
	text: string;
	id: string;
	progress: number;
}) {
	const { color, text, id, progress } = props;
	// didChangeDependencies
	// useEffect(() => {
	// 	// register tippy tooltips only when progress changes
	// 	tippy(`#${id}`, {
	// 		content: `${progress}%`,
	// 		placement: "left",
	// 	});
	// }, [progress]);

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
