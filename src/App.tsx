import React from 'react';
import { hot } from 'react-hot-loader/root';
import 'Styles/styles.scss';
import { ErrorHandler, Scene } from 'Components';

const App = () => {
	return (
		<ErrorHandler>
			<Scene />
		</ErrorHandler>
	);
};

export default hot(App);
