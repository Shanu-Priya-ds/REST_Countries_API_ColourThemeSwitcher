"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let bodyElement = document.body;
let moonIcon = document.getElementById("moon_icon");
;
console.log(bodyElement);
bodyElement.addEventListener("click", () => {
    bodyElement.classList.toggle("dark-mode");
});
if (moonIcon != null) {
    moonIcon.addEventListener("click", () => {
        bodyElement.classList.toggle("dark-mode");
    });
}
else {
    console.log("Moon icon element null");
}
//# sourceMappingURL=main.js.map