const currentUrl = window.location.href;


const everything = currentUrl.split("?")


let formData = everything[1].split('&')


function show(data) {
    formData.forEach((element) => {
        if (element.startsWith(data)) {
            result = element.split('=')[1].replace("%40","@").replace("+"," ").replace("+"," ")
        }
    })
    return(result)
}

const showInfo = document.querySelector('#results')
showInfo.innerHTML = `
<p>Appointment for ${show("first")} ${show("last")}</p>
<p>Proxy ${show('ordinance')} on ${show("fecha")} in the ${show("location")}</p>
<p>Your phone: ${show("phone")}</p>
<p>Your email: <a href="mailto:${show('email')}">${show("email")}</a></p>
`