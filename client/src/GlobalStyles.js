import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html, body {
    font-size: 18px;
}
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        /* color: #fff; */
    }
`;

export default GlobalStyle;
