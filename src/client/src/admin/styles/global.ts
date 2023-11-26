const GlobalStyles = `
* {
  box-sizing: border-box;
}
html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  font-size: 16px;
}
body {
  margin: 0;
  font-size: 0.85rem;
  font-family: Poppins, Helvetica Neue, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  min-height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  color: #323433;
  background-color: #f9fafb;
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
img {
  max-width: 100%;
  height: auto;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 600;
  line-height: 1.2;
}
h1 {
  font-size: 1.421875rem;
}
h2 {
  font-size: 1.21875rem;
}
h3 {
  font-size: 1.1rem;
}
h4 {
  font-size: 1rem;
}
h5 {
  font-size: 0.95rem;
}
h6 {
  font-size: 0.9rem;
}

body.light-mode {
  --is-dark: false;
  --text-primary: #dea724;
  --text-default: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --text-icon: #64748b;
  --bg-card: #fff;
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

body.dark-mode {
  --is-dark: true;
  --text-primary: #dea724;
  --text-default: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --text-icon: #64748b;
  --border: #e2e8f0;

  --color-gray-100: #f5f8fa;
  --color-gray-200: #eff2f5;
  --color-gray-300: #e4e6ef;
  --color-gray-400: #b5b5c3;
  --color-gray-500: #a1a5b7;
  --color-gray-600: #7e8299;
  --color-gray-700: #5e6278;
  --color-gray-800: #3f4254;
  --color-gray-900: #181c32;
}

body {
  --text-primary: #dea724;
  --text-default: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --text-icon: #64748b;
  --border: #e2e8f0;

  --color-gray-100: #f5f8fa;
  --color-gray-200: #eff2f5;
  --color-gray-300: #e4e6ef;
  --color-gray-400: #b5b5c3;
  --color-gray-500: #a1a5b7;
  --color-gray-600: #7e8299;
  --color-gray-700: #5e6278;
  --color-gray-800: #3f4254;
  --color-gray-900: #181c32;

  --color-violet-50: #f3f0ff;
  --color-violet-100: #e5dbff;
  --color-violet-200: #d0bfff;
  --color-violet-300: #b197fc;
  --color-violet-400: #9775fa;
  --color-violet-500: #845ef7;
  --color-violet-600: #7950f2;
  --color-violet-700: #7048e8;
  --color-violet-800: #6741d9;
  --color-violet-900: #5f3dc4;
}
`;

export default GlobalStyles;
