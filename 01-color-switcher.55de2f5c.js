!function(){var t=document.createElement("button");t.textContent="Start";var e,n,d=document.createElement("button");function a(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"))}d.textContent="Stop",d.disabled=!0,t.addEventListener("click",(function(){t.disabled=!0,d.disabled=!1,e=setInterval(a,1e3)})),d.addEventListener("click",(function(){d.disabled=!0,t.disabled=!1,clearInterval(e)})),(n=document.createElement("div")).style.display="flex",n.style.justifyContent="center",n.style.position="fixed",n.style.top="50%",n.style.left="50%",n.style.transform="translate(-50%, -50%)",document.body.appendChild(n),n.appendChild(t),n.appendChild(d)}();
//# sourceMappingURL=01-color-switcher.55de2f5c.js.map
