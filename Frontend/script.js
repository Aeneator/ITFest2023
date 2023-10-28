var LoginForm = document.getElementById("LoginForm");
var RegisterForm = document.getElementById("RegisterForm");
var Indicator = document.getElementById("Indicator");

let token = "";

function register(){
    RegisterForm.style.transform = "translateX(0px)";
    LoginForm.style.transform = "translateX(0px)";
    Indicator.style.transform = "translateX(33px)";
  
    
}
function login(){
    RegisterForm.style.transform = "translateX(400px)";
    LoginForm.style.transform = "translateX(400px)";
    Indicator.style.transform = "translateX(-36px)";
}
function savePlaceholders() {
    // Get the values of the placeholders
    var usernamePlaceholder = document.getElementById("usernameRegister").value;
    var emailPlaceholder = document.getElementById("emailRegister").value;
    var parolaPlaceholder = document.getElementById("parolaRegister").value;

    // You can store these values in variables or an object, as needed
    var placeholders = {
        username: usernamePlaceholder,
        email: emailPlaceholder,
        password: parolaPlaceholder
    };
    console.log(placeholders);
    var placeholdersJSON = JSON.stringify(placeholders);
    console.log(placeholdersJSON);
    const sendRequest = async () => {
    console.log("In functie");
        try {
            /* const response = await fetch("http://192.168.0.198:3000/api/users", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: placeholdersJSON
            }); */
            const response = await fetch("http://192.168.0.198:3000/api/users/", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: placeholdersJSON
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const userData = await response.json();
            console.log(userData);
            token = userData.token;
            
        } catch (err) {
            console.error("Fetch Error:", err.message);
        }
    }
    sendRequest();                   
}