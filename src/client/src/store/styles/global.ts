const GlobalStyles = `
* {
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
}
html {
  font-size: 16px;
}
html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  font-size: 1rem;
}
body {
  margin: 0;
  font-size: 0.9375rem;
  font-family: Urbanist, Helvetica Neue, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  min-height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  color: #323433;
}
input,
select,
button {
  font-family: inherit;
  &:focus {
    outline: none;
  }
}
a {
  text-decoration: none;
  background-color: transparent;
  color: inherit;
}
input,
button {
  margin: 0;
  border: 0;
  outline: none;
}
select,
button {
  &:hover {
    cursor: pointer;
  }
}
blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
li {
  list-style: none;
}

h1,
h2 {
  font-family: MinervaModern, Helvetica Neue, Arial, sans-serif;
}

img {
  max-width: 100%;
  height: auto;
}

:root {
  --text-primary: #4e7661;
  --text-default: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --border: #e2e8f0;

  --color-gray-50: #f8fafc;
  --color-gray-100: #f1f5f9;
  --color-gray-200: #e2e8f0;
  --color-gray-300: #cbd5e1;
  --color-gray-400: #94a3b8;
  --color-gray-500: #64748b;
  --color-gray-600: #475569;
  --color-gray-700: #334155;
  --color-gray-800: #1e293b;
  --color-gray-900: #0f172a;
}
`;

export default GlobalStyles;
