/** @jsx _jsx */

import Ring, { ToolTip } from "../Ring/Ring";
import { css, jsx as _jsx } from "@emotion/core";
import StateType from "../../models/rings";
import React, { useState } from "react";

export default function RingSystem({
	state: { count, progresses },
}: {
	state: StateType;
}) {
	const radius = 112;
	const stroke = 12;
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
		console.log(
			distsquared,
			(normalizedRadius - stroke / 2) ** 2,
			normalizedRadius ** 2,
			distsquared < normalizedRadius ** 2,
			distsquared > normalizedRadius ** 2 - stroke
		);
		if (
			distsquared < normalizedRadius ** 2 &&
			distsquared > (normalizedRadius - stroke / 2) ** 2
		) {
			tooltip.style.display = "block";
		}
		parentCB(child);
	}

	function distSq(x1: number, y1: number, x2: number, y2: number) {
		return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
	}

	function hideTooltip() {
		var tooltip = document.getElementById("tooltip") as HTMLDivElement;
		tooltip.style.display = "none";
	}

	return (
		<div
			css={css`
				position: relative;
				height: ${radius * 2}px;
			`}
			onMouseMove={(ev) => showTooltip(ev, <div>{"Pooooo"}</div>)}
		>
			<ToolTip>{currentTooltipChild}</ToolTip>
			{[...Array(count)].map((_, i) => {
				const ret = (
					<Ring
						key={i}
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
		</div>
	);
}
