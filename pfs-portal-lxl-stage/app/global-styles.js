import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

.scrollbar-cus{
  overflow: auto;
}

.scrollbar-cus::-webkit-scrollbar {
  width: 5px;
}

.scrollbar-cus::-webkit-scrollbar-track {
  background:#DFE1E6;
  border-radius:5px;
}

.scrollbar-cus::-webkit-scrollbar-thumb {
  background:#adb6c9;
  border-radius:5px;
}


  html,
  body {
    height: 100%;
    width: 100%;
  }

  // body {
  //   font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  // }

  // body.fontLoaded {
  //   font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  // }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    // font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
// Custom styles

  .cardHeader{
    text-transform: uppercase;
  
      font-size:16px;
      font-weight:600;
      color:#7A869A;
  
  }

  .bottomDivider{
    border-bottom: 1px solid beige;
  }

  // styles for student page
  .icons{
    height: 12px;
    width: 12px;
  }

  .customRender{
    min-width: 100px;
  }
  .MuiSelect-select.MuiSelect-select{
    font-size: 12px !important;
  }
  .MuiMenuItem-root{
    font-size: 12px !important;
  }
  .MuiInputBase-input{
    font-size: 14px !important;
  }
  .MuiTooltip-popper{
    top: 0% !important;
    left: 8% !important;
    
  }
  .tox .tox-edit-area__iframe{
    background:#fafbfc !important;
  }
  .tox .tox-toolbar, .tox .tox-toolbar__overflow, .tox .tox-toolbar__primary{
    background:unset !important;
  }
  .tox .tox-editor-header {
    z-index: 1;
    // position: absolute ;
    // bottom: 5px ;
    border-bottom: 1px solid #ccc !important;
    border:none;
    background: #fff ;
    // left: 5px ;
  }
  .MuiInput-underline:hover:not(.Mui-disabled):before{
    border-bottom: unset !important;
  }
  .MuiInput-underline:before,.MuiInput-underline:after{
    transition:unset !important;
    border-bottom: unset !important;
    transform: scaleX(0) !important;
  }
  .MuiPickerDTToolbar-toolbar{
    justify-content: center !important;
    padding: 0px 10px !important;
  }
  .add-teacher:hover::before {
    content: '+';
    position: absolute;
    color: #52C15A;
    left: -16px;
    font-size: 20px;
    top: -4px;
  }
  .add-teacher:hover{
    color: #52C15A;
  }
  
  .deleteCardActive{
    background: #F4F6FF !important;
    border: 0.5px solid #092682 !important;
    border-radius: 3px !important;
  } 

`;

export default GlobalStyle;
