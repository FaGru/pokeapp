import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }



  :root {
    --card-color-normal: darkgray;
    --card-color-grass: #14A06F;
    --card-color-poison: lightgreen;
    --card-color-bug: darkgreen;
    --card-color-fire: #F42A28;
    --card-color-water: #37A5C6;
    --card-color-ice:#37A5C6;
    --card-color-psychic: purple;
    --card-color-ghost: purple;
    --card-color-electric: yellow;
    --card-color-rock: #716B45;
    --card-color-fighting: #716B45;
    --card-color-ground: #716B45;
    --card-color-dragon: lightgray;
    --card-color-fairy: hotpink;
  }

  body {
    background-color: white;
    h1 {
      text-align: center;
    }
  }
`;
export default GlobalStyle;
