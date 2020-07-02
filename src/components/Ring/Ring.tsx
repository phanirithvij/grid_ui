/** @jsx jsx */

import { css, jsx } from "@emotion/core";

export default function Ring(props: {
	radius: number;
	stroke: number;
	color: string;
	progress: number;
	offset: number;
}) {
	const { radius, stroke, progress, offset, color } = props;
	let normalizedRadius = radius - stroke * 2;
	let circumference = normalizedRadius * 2 * Math.PI;
	const strokeDashoffset = circumference - (progress / 100) * circumference;
	const offsetAngle = (360 * offset) / 100;

	return (
		<svg
			height={radius * 2}
			width={radius * 2}
			css={css`
  			position: absolute;
				.progress-ring__circle {
					transition: 0.35s stroke-dashoffset;
					// axis compensation
					transform: rotate(${offsetAngle}deg);
					// transform: rotate(calc(-90deg + ${offsetAngle}deg));
					transform-origin: 50% 50%;
				}
			`}
		>
			<circle
				className="progress-ring__circle"
				stroke={color}
				fill="transparent"
				strokeWidth={stroke}
				strokeDasharray={circumference + " " + circumference}
				style={{ strokeDashoffset }}
				r={normalizedRadius}
				cx={radius}
				cy={radius}
			/>
		</svg>
	);
}
