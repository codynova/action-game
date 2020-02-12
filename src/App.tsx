import React from 'react';
import { hot } from 'react-hot-loader/root';
import 'Styles/styles.scss';
import { ErrorHandler, Scene2 } from 'Components';

const App = () => {
	return (
		<ErrorHandler>
			<Scene2 />
		</ErrorHandler>
	);
};

export default hot(App);
