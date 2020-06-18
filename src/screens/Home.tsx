import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div>
			Home page In a sense
			<Link to="/nodes">Helo</Link>
		</div>
	);
}
