import React from 'react';
import { ErrorService } from 'Services';

class ErrorHandler extends React.PureComponent<{}, { hasError: boolean }> {

	constructor (props: {}) {
		super(props);

		this.state = {
			hasError: false,
		};
	}

	componentDidCatch (error: Error, info: any) {
		this.setState({
			hasError: true,
		});

		ErrorService.logError(error, info);
	}

	render () {
		if (this.state.hasError) {
			return (
				<h1>Something went wrong.</h1>
			);
		}

		return this.props.children;
	}

}

export { ErrorHandler };
