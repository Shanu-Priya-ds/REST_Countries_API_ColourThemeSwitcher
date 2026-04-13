export function createElement(elementName, innerText) {
    let element = document.createElement(elementName);
    element.innerText = innerText;
    return element;
}
export function createElementAndAppend(elementName, innerText, container) {
    let element = createElement(elementName, innerText);
    container.appendChild(element);
}
export function createDetailRowAndAppend(label, value, container) {
    let p = createElement("p", "");
    createElementAndAppend("strong", label, p);
    if (value)
        p.append(" " + value);
    container.append(p);
}
//# sourceMappingURL=domUtils.js.map