import React from 'react';
import { hot } from 'react-hot-loader/root';
import 'Styles/styles.scss';
import { ErrorHandler, Test } from 'Components';

const App = () => {
	return (
		<ErrorHandler>
			<Test />
		</ErrorHandler>
	);
};

export default hot(App);
