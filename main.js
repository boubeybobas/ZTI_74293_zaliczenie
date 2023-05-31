
const form = document.querySelector("#form");
const name = document.querySelector("#name");
const surname = document.querySelector("#surname");
const birthday = document.querySelector("#birthday");
const username = document.querySelector("#username")
const password = document.querySelector("#password");
const password2 = document.querySelector("#password_2");
const email = document.querySelector("#email");
const clearButton = document.querySelector('.clear');
const submitButton = document.querySelector('.submit');
const okButton = document.querySelector('.ok');
const showpsw = document.querySelector('#showpsw');
const overlay = document.querySelector("#overlay")

const inputs = [name.parentElement, surname.parentElement, birthday.parentElement, username.parentElement, email.parentElement, password.parentElement, password2.parentElement];
let allInputsSuccess = true;

okButton.addEventListener('click', (e) => {
  overlay.style.display = 'none'
  form.classList.remove('blur');
  form.reset();

  })

clearButton.addEventListener('click', (e) => {
form.reset();
})

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  validateInputs();
  allInputsSuccess = checkInputsClass('success');

  if (allInputsSuccess){
    overlay.style.display = 'block'
    form.classList.add('blur');
  }

  else{
    overlay.style.display = 'none'
  }

});

function checkInputsClass(className) {
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].classList.contains(className)) {
      return false;
    }
  }
  return true;
}

showpsw.addEventListener('change', (e) => {  //pokazuje/chowa hasło

  if (password.type === "password") {
    password.type = "text";
    password2.type = "text"
  } else {
    password.type = "password";
    password2.type = "password"
  }
})

const validateInputs = () => {
  if(name.value.trim() ===''){
    setFail(name, "This field cannot be empty!")
  }
  else{
    setSuccess(name)
  }

  if(surname.value.trim() ===''){
    setFail(surname, "This field cannot be empty!")
  }
  else{
    setSuccess(surname)
  }
  checkDate();
  checkUsername();
  checkEmail();
  checkPassword();
  checkPasswordMatch();
}

const setFail = (input, message) => {
  const box = input.parentElement;
  const errMsg = box.querySelector('.error');
  errMsg.innerText = message;
  box.classList.add('error')
  box.classList.remove('success')
}

const setSuccess = (input) => {
  const box = input.parentElement;
  const errMsg = box.querySelector('.error');
  errMsg.innerText = "";
  box.classList.add('success');
  box.classList.remove('error');
}


function checkDate() {  //sprawdza wpiana date, nie kaceptuje jesli uzytkownik nie ma 18 lat
  var dateString = birthday.value;

  var enteredDate = new Date(dateString);

  var now = new Date();

  if (isNaN(enteredDate)) {
    setFail(birthday, "Enter a valid birthday!")
  } else {
    var minDate = new Date();
    minDate.setFullYear(now.getFullYear() - 18);

    if(enteredDate > minDate){
      setFail(birthday, 'You must be at least 18 years old to set up an account!')
    }

    else{
      setSuccess(birthday)
    }
  }
}

function checkUsername() {
  if(username.value.trim() ===''){
    setFail(username, "This field cannot be empty!")
  }
  else{
    const regex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/ //5-20
    if (!(regex.test(username.value.trim()))) {
      setFail(username, "Invalid username!");
  }

  else {
      setSuccess(username);
  }

  }

}

function checkEmail () {

  if(email.value.trim() ===''){
    setFail(email, "This field cannot be empty!")
  }
  else{
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!(regex.test(email.value.trim()))) {
      setFail(email, "Please enter a valid e-mail adress");
  }

  else {
      setSuccess(email);
  }
}
}
  function checkPassword() {  //min 8 znaków, jedna litera, jedna liczba, jeden znak specjalny
    if(password.value.trim() ===''){
      setFail(password, "This field cannot be empty!")
    }
    else{
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>.]{8,}$/

    if (!(regex.test(password.value.trim()))) {
      setFail(password, 'Password must be at least 8 characters, contain one letter, one number and one special character.');
          }

          else {
              setSuccess(password);
          }
      }
  }
  function checkPasswordMatch() { //sprawdza czy haslo1 == haslo2

    if(password2.value.trim() ===''){
      setFail(password2, "This field cannot be empty!")
    }
    else{
            if (password.value.trim() !== password2.value.trim()) {
              setFail(password2, "The passwords don't match!",);
              }
          else {
              setSuccess(password2);
              }
            }
}