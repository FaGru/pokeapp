import { createGlobalStyle } from 'styled-components';
import arena from './images/arena.jpg';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }



  :root {
    --card-color-normal: darkgray;
    --card-color-grass: #008134;
    --card-color-poison: #2db52d;
    --card-color-bug: darkgreen;
    --card-color-fire: #97050f;
    --card-color-water: #005ec9;
    --card-color-ice:#37A5C6;
    --card-color-psychic: purple;
    --card-color-ghost: purple;
    --card-color-electric: #faab00;
    --card-color-rock: #716B45;
    --card-color-fighting: #716B45;
    --card-color-ground: #716B45;
    --card-color-dragon: lightgray;
    --card-color-fairy: hotpink;

    --card-color-gold: gold;
    
  }

  body {
    background-color: #3f3a3a;
    color: white;
    font-family: 'Caveat', cursive;
    font-size: 112%;
    h1 {
      text-align: center;
    }
  }
`;
export default GlobalStyle;
