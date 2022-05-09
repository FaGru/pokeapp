import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }



  :root {
    
    --card-color-normal: #B5B9C4;
    --card-color-grass: #8BBE8A;
    --card-color-poison: #9F6E97;
    --card-color-bug: #8BD674;
    --card-color-fire: #FFA756;
    --card-color-water: #58ABF6;
    --card-color-ice:#91D8DF;
    --card-color-psychic: #FF6568;
    --card-color-ghost: #8571BE;
    --card-color-electric: #F2CB55;
    --card-color-rock: #D4C294;
    --card-color-fighting: #EB4971;
    --card-color-ground: #F78551;
    --card-color-dragon: #7383B9;
    --card-color-fairy: #EBA8C3;
    --card-color-dark: #6F6E78;
    --card-color-flying: #83A2E3;
    --card-color-steel: #4C91B2;


    --card-color-gold: gold;

    --font-color-normal: #9DA0AA;
    --font-color-grass: #62B957;
    --font-color-poison: #A552CC;
    --font-color-bug: #8CB230;
    --font-color-fire: #FD7D24;
    --font-color-water: #4A90DA;
    --font-color-ice:#61CEC0;
    --font-color-psychic: #EA5D60;
    --font-color-ghost: #556AAE;
    --font-color-electric: #EED535;
    --font-color-rock: #BAAB82;
    --font-color-fighting: #D04164;
    --font-color-ground: #DD7748;
    --font-color-dragon: #0F6AC0;
    --font-color-fairy: #ED6EC7;
    --font-color-dark: #58575F;
    --font-color-flying: #748FC9;
    --font-color-steel: #417D9A;


    --font-color-white: #FFFFFF;
    --font-color-black: #17171B;
    --font-color-grey: #747476;
    --font-color-number: rgba(23, 23, 27, 0.6);
    
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    h1 {
      text-align: center;
    }
  }
`;
export default GlobalStyle;
