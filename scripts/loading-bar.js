class LoadingBar extends HTMLElement {
  constructor() {
    super();
    
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.innerHTML = `
<style>
  .loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    align-items: center;
    background: #00000099;
  }

  .loader,
  .loader:before,
  .loader:after {
    background: cyan;
    animation: load1 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }
  .loader {
    color: cyan;
    text-indent: -9999em;
    margin: 88px auto;
    position: relative;
    font-size: 11px;
    animation-delay: -0.16s;
  }
  .loader:before,
  .loader:after {
    position: absolute;
    top: 0;
    content: '';
  }
  .loader:before {
    left: -1.5em;
    animation-delay: -0.32s;
  }
  .loader:after {
    left: 1.5em;
  }
  @-webkit-keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
</style>

<div class="loader-container">
  <div class="loader">

  </div>
</div>
`;

  }
  
  show() {
    this.shadow.querySelector('.loader-container').style.display = 'flex';
  }
  
  hide() {
    this.shadow.querySelector('.loader-container').style.display = 'none';
  }
}

customElements.define('loading-bar', LoadingBar);
