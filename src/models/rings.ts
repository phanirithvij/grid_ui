interface StateType {
	count: number;
	progresses: { [key: number]: { color: string; progress: number } };
}

export default StateType;
