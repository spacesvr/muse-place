import { Global, css } from "@emotion/core";

const content = "https://d27rt3a60hh1lx.cloudfront.net/content/c2a";

const globalStyles = css`
  @font-face {
    font-family: "Quicksand";
    src: url("https://d27rt3a60hh1lx.cloudfront.net/fonts/Quicksand_Bold.otf");
  }
  
  @font-face {
    font-family: 'HelveticaBlk';
    src: url('${content}/fonts/HelveticaLTStd-Blk.otf') format('opentype');
  }
  @font-face {
    font-family: 'EmberCd';
    src: url('${content}/fonts/Amazon_Typefaces_Complete_Font_Set_Mar2020/Ember+Condensed/AmazonEmberCdRc_Bd.ttf') format('opentype');
  }

  html,
  body,
  #__next {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
  }
`;

export default () => <Global styles={globalStyles} />;
