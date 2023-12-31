import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 
 @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

    *,
    *:before,
    *:after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
    }

    html, body, div,
    input, button, select, option,
    h1, h2, h3, h4, h5, h6, p,
    text {
        font-family: 'Roboto', sans-serif;
         font-weight: 500;
    }

    html, body {
        max-width: 100vw;
    }

    /* http://meyerweb.com/eric/tools/css/reset/
        v2.0 | 20110126
        License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        background-image: url(https://r4.wallpaperflare.com/wallpaper/958/1006/340/final-fantasy-xiv-a-realm-reborn-final-fantasy-xiv-video-games-video-game-art-games-art-hd-wallpaper-9930e88d312acd0bf697586f100176bd.jpg);
        background-repeat: no-repeat;
        background-size: cover;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    } 
    
    :root {
        --navy-blue: #1c232e;
    }
    
  
`;

