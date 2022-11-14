let textInput = document.querySelectorAll("#testInput")

var previousKey = "";

textInput.forEach(ele => ele.addEventListener("paste", pasteHandle))

textInput.forEach(ele => ele.addEventListener("keydown", (e) => {

    let input = e.target
    let key = e.key
    if (key == "Alt" || key == "Control") return

    switch(key){
        case "ArrowLeft": {
            if (input.selectionStart === 0 && input.selectionEnd === 0) {
                const prev = input.previousElementSibling ?? "NoPrev"
                prev == "NoPrev" ? null : prev.focus()
                prev.selectionStart = prev?.value?.length
                prev.selectionEnd = prev?.value?.length
                e.preventDefault()
            }
            break
        }
        case "ArrowRight": {
            if (input.selectionStart === input.value.length && input.selectionEnd === input.value.length) {
                const next = input.nextElementSibling ?? "NoNext"
                next == "NoNext" ? null : next.focus()
                next.selectionStart = 1
                next.selectionEnd = 1
                e.preventDefault()
            }
            break
        }
        default: {
            if(key.match(/^\D$/)) return e.preventDefault()
            if (Number.isInteger(+key) && input.selectionStart === 4 && input.selectionEnd === 4) {
                e.preventDefault()
                const next = input.nextElementSibling ?? "NoNext"
                next == "NoNext" ? null : next.focus()
                next.selectionStart = 0
                next.selectionEnd = 0
                next.value += key
            }
            if (key === "Backspace" && input.selectionStart === 0 && input.selectionEnd === 0) {
                e.preventDefault()
                const prev = input.previousElementSibling ?? "NoPrev"
                prev == "NoPrev" ? null : prev.focus()
                prev.selectionStart = prev?.value?.length - 1
                prev.selectionEnd = prev?.value?.length - 1
                prev.value = prev?.value?.slice(0, -1)
            }
            
        }

    }
}))

function pasteHandle(key) {

    let paste = (key.clipboardData).getData('text');
    console.log(paste)
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    selection.deleteFromDocument();

    let newPaste = paste.slice(0, 16).split("")

    if (!newPaste.every(val => !!+val)) {
        console.log(newPaste.every(val => !!+val))
        key.preventDefault()
        return
    }

    if (paste.length > 4) {
        let focus = textInput[+Math.ceil(newPaste.length/4) - 1]
        focus.focus()
        key.preventDefault()

        i = 0;
        while (newPaste.length !== 0) {

            let lel = i * 4

            let check = newPaste.slice(0, newPaste.length > 3 ? 4 : newPaste.length).join("")

            textInput[i].value = (newPaste.splice(0, newPaste.length > 3 ? 4 : newPaste.length).join(""))

            i++;

        }

    }

}