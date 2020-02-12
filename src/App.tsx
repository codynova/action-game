import React from 'react';
import { hot } from 'react-hot-loader/root';
import 'Styles/styles.scss';
import { ErrorHandler } from 'Components';
import { Test1, Test2 } from 'Scenes';

const App = () => {
	return (
		<ErrorHandler>
			<Test2 />
		</ErrorHandler>
	);
};

export default hot(App);
