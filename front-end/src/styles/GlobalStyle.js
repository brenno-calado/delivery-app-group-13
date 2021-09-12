import { createGlobalStyle } from 'styled-components';

const url = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto');

  @font-face {
    font-family: Roboto, sans-serif;
    src: url(${url});
  }

  html, body {
    font-weight: 600;
  }

  *, *:before, *:after {
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    margin: 0;
    padding: 0;
  }
`;
