// Exercise 1 - Create a const user with name, age and email. 
// Turn into Json Object and Json string to return an attribute of an object

const user = {
    user_name: "Adrien",
    age: 26,
    email: "adrien_dejonc@eticlagarve.com"
}

const userJson = JSON.stringify(user)
console.log(userJson)

const userObj = JSON.parse(userJson)
console.log(userObj)
console.log("This is an access to name attribute of userObj: "+userObj.user_name)

// Create a data.json with mocked json info
// Import json to homepage and console.log

const navbar_menu = [
    {
        title: "The Padel Social Club",
        url: "/",
    },
    {
        title: "The Social",
        url: "/the-social",
    },
    {
        title: "Padel Premier Tracking",
        url: "/premier-tracking",
    },
    {
        title: "Book Course",
        url: "/book-course",
    },
    {
        title: "About",
        url: "/about",
    }
]

const menuJson = JSON.stringify(navbar_menu)
console.log(menuJson)
const menuObj = JSON.parse(menuJson)
console.log(menuObj)
