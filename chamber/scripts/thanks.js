const currentUrl = window.location.href;


const everything = currentUrl.split("?")


let formData = everything[1].split('&')
console.log(formData)

function show(data) {
    formData.forEach((element) => {
        if (element.startsWith(data)) {
            result = element.split('=')[1].replace("%40","@").replace("+",", ").replace("+"," ").replace("+"," ").replace("%3A",":").replace("%3A",":").replace("+"," ")
        }
    })
    return(result)
}

const showInfo = document.querySelector('#results')
showInfo.innerHTML = `
<p>Application from ${show("first")} ${show("last")}</p>
<p>Your Organization Name: ${show("organization")}</p>
<p>Your Phone: ${show("phone")}</p>
<p>Your Email: <a href="mailto:${show('email')}">${show("email")}</a></p>
<p>Date: ${show("date")}</p>
`