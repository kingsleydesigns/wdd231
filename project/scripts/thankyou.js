const currentUrl = window.location.href;


const everything = currentUrl.split("?")


let formData = everything[1].split('&')
console.log(formData)

function show(data) {
    formData.forEach((element) => {
        if (element.startsWith(data)) {
            result = element.split('=')[1].replace("%40","@").replace("%2C"," and ").replace("%2C"," and ").replace("+",", ").replace("+"," ").replace("+",", ")
        }
    })
    return(result)
}

const showInfo = document.querySelector('#results')
showInfo.innerHTML = `
<p>Meal Plan Details from ${show("name")}</p>
<p>Your Email: <a href="mailto:${show('email')}">${show("email")}</a></p>
<p>Your Dietary Preference: ${show("diet")}</p>
<p>Your Preferred Cuisine: ${show("cuisine")}</p>
<p>Your Meal Types Include: ${show("mealType")}</p>
<p>Date: ${show("date")}</p>
`