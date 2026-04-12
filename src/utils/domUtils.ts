export function createElement(elementName: string, innerText: string): HTMLElement {
    let element = document.createElement(elementName);
    element.innerText = innerText;
    return element;
}

export function createElementAndAppend(elementName: string, innerText: string, container:HTMLElement){
    let element = createElement(elementName, innerText);
    container.appendChild(element);
}

export function createDetailRowAndAppend(label:string, value:string|undefined, container:HTMLElement){
    let p = createElement("p","");
    createElementAndAppend("strong",label,p);
    if(value) 
        p.append(value);
    container.append(p);
}
