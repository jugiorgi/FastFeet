import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

* {
	margin: 0;
	padding: 0;
	outline: 0;
	box-sizing: border-box;
}

*:focus {
	outline: 0;
}

body {
	-webkit-font-smoothing: antialiased;
}

html, body, #root {
	min-height: auto;
	height: 100%;
	background: #f5f5f5;
}

body, input, button {
	font: 14px 'Roboto', sans-serif;
}

a {
	text-decoration: none;
}

ul {
	list-style: none;
}

button {
	cursor: pointer;
}
`;
