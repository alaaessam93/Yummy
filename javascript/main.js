//sliding navbar
let sideNavbarWidth = $('.navbar-content').outerWidth();
$(document).ready(() => {
    
        $(".loadingScreen").fadeOut(1000)
        $("body").css("overflow", "visible")
        getData()
 
})
$('.menu-icon').click(function(){
    if($('.side-navbar').css('left') == '0px'){
        $('.side-navbar').animate({left: -sideNavbarWidth} , 500);
        $('.menu-icon i').removeClass('fa-x');
        $('.menu-icon i').addClass('fa-bars');
    }else{
        $('.side-navbar').animate({left: 0} , 500)
        $('.menu-icon i').removeClass('fa-bars');
        $('.menu-icon i').addClass('fa-x');
   
    }
    
})
function openSideNav() {
    $(".side-navbar").animate({
        left: 0
    }, 500)

    $('.menu-icon i').removeClass('fa-x');
    $('.menu-icon i').addClass('fa-bars');


    for (let i = 0; i < 5; i++) {
        $(".list li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}
$('.close-icon').click(function(){
    if ($(".side-navbar").css("left") == "0px") {
        closeSideNavbar()
    } else {
        openSideNav()
    }
})

function closeSideNavbar (){
    $('.side-navbar').animate({left: -sideNavbarWidth} , 500);  
    $('.menu-icon i').removeClass('fa-x');
        $('.menu-icon i').addClass('fa-bars');
}
closeSideNavbar();

//************ */

//show data in home page

async function getData (){
  let data = await fetch ('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  data = await data.json();
  let newArray = data.meals;
 displayMeals(newArray);
}
// getData()


// var data;
// var req = new XMLHttpRequest();
// req.open('Get','https://www.themealdb.com/api/json/v1/1/search.php?s=')
// req.send();
// req.addEventListener('readystatechange',function(){
//     if (req.readyState==4 && req.status==200){
//         data = JSON.parse(req.response);
      
//        var newArray = data.meals;
       
      
//     }
//     displayMeals(newArray);
// })

function displayMeals(arr){
    let cartona = ``;
    for(let i=0; i < arr.length ; i++ ){
        cartona += `
        <div class="col-md-3 ">
                    <div onclick="getMeal (${arr[i].idMeal})" class="photo position-relative cursor-pointer overflow-hidden my-3">
                        <img src="${arr[i].strMealThumb}" class="rounded rounded-3 w-100" alt="">
                        <div class="photo-overlay d-flex   align-items-center rounded rounded-3 px-4">
                            <h3>${arr[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
    }
    document.getElementById("rowData").innerHTML  = cartona ;
}

//*********************** */
//onclick="getCategoryMeals('${arr[i]}')"
//show data in category 

function displayCategory(arr){
    let cartona = ``;
    for (let i=0 ; i<arr.length ; i++){
        cartona += `
        <div class="col-md-3 ">
                    <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="photo  position-relative cursor-pointer overflow-hidden">
                        <img src="${arr[i].strCategoryThumb}" class="rounded rounded-3 w-100" alt="">
                        <div class="photo-overlay d-flex flex-column pt-3 text-center   align-items-center rounded rounded-3 px-4">
                            <h3>${arr[i].strCategory}</h3>
                            <p>${arr[i].strCategoryDescription.split(" ").slice(0,10).join(" ")}</p>
                        </div>
                    </div>
                </div>
        `
    }
    document.getElementById("rowData").innerHTML  = cartona ;
}
async function getCategory (){
    let data = await fetch ('https://www.themealdb.com/api/json/v1/1/categories.php');
    data = await data.json();
    let newArray = data.categories;
   displayCategory(newArray);
  }

$('#category').click(function(){
    
    getCategory();
    closeSideNavbar();

})

async function getCategoryMeals(category){
    let data = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    data = await data.json();
    let newArray = data.meals;
    displayMeals(newArray)

}

//************************ */
// meal details

async function getMeal (mealID){
    let data = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    data = await data.json();
    console.log(data);
    let newArray = data.meals;
    displayMealRecipe(data.meals[0]);
    
  }


  function displayMealRecipe (meal){
    let cartona = ``;
    let ingredients = ``;
    for (let i =1; i<=20 ; i++){
        if (meal[`strIngredient${i}`]){
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        
        }
    }
    let mealtags = ``;
    let tags = meal.strTags?.split(',');
    if (tags == null){
        tags = [];
    }
    for (let i=0; i<tags.length; i++){
        mealtags += `
        <span class="alert alert-danger py-1 m-2">${tags[i]}</span>
        `
    }

  cartona =  `
    <div class="col-md-4 pt-5 text-white">
    <img src="${meal.strMealThumb}" class="w-100 rounded rounded-2" alt="">
    <h2 class="py-4">${meal.strMeal}</h2>
</div>
<div class="col-md-8 text-white">
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>
    <h2>Area : ${meal.strArea}</h2>
    <h2>Category : ${meal.strCategory}</h2>
    <h2>Recipes</h2>
    <ul class="list-unstyled d-flex flex-wrap">
        ${ingredients}
    </ul>
    <h2 class="">Tags :</h2>
    <div class="py-3">${mealtags}</div>
    <div class="pt-3">
        <a target="_blank" class="btn btn-success" href="${meal.strSource}">Source</a>
    <a target="_blank" class="btn btn-danger" href="${meal.strYoutube}">Youtube</a>
    </div>
</div>
    `
    document.getElementById("rowData").innerHTML  = cartona ;
  }


//************************************************* */

//display area

async function getArea (){
    let data = await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    data = await data.json();
    let newArray = data.meals;
    displayArea(newArray)
    
}

function displayArea(arr){
    let cartona = ``;
    for (let i=0 ; i<arr.length ; i++){
        cartona+= `
        <div onclick="getAreaMeals('${arr[i].strArea}')" class="col-md-3 text-white text-center cursor-pointer px-5 my-2 font-30">
        <i class="fa-solid fa-house-laptop fa-3x"></i>
        <h2>${arr[i].strArea}</h2>
    </div>
        `
    }
    document.getElementById("rowData").innerHTML  = cartona ;
}

$('#area').click(function(){
    
    getArea ();
    closeSideNavbar();

})

async function getAreaMeals(area){
    let data = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    data = await data.json();
    let newArray = data.meals;
    displayMeals(data.meals.slice(0,20))

}


//*************************** */

//display ingredients


async function getIngredients (){
    let data = await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    data = await data.json();
    let newArray = data.meals;
    displayIngredients(newArray.slice(0,20))
    
}
function displayIngredients(arr){
    let cartona = ``;
    for (let i=0 ; i<arr.length ; i++){
        cartona+= `
        <div class="col-md-3 ">
                    <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="photo  cursor-pointer text-white text-center  py-3 bg-black">
                        <i class="fa-solid fa-drumstick-bite fa-3x"></i>
                        <h2>${arr[i].strIngredient}</h2>
                        <p>${arr[i].strDescription.split(" ").slice(0,25).join(" ")}</p>
                    </div>
                </div>
        `
    }
    document.getElementById("rowData").innerHTML  = cartona ;
}

$('#ingredients').click(function(){
    
    getIngredients ();
    closeSideNavbar();

})

async function getIngredientsMeals(ingredients){
    let data = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    data = await data.json();
    let newArray = data.meals;
    displayMeals(newArray.slice(0,20))

}


//*************************** */
//search bar

function searchInputs (){
    document.getElementById("rowData").innerHTML  = `
    <div id="searchByName" class="col-md-6">
                    <input onkeyup="searchByName(this.value)" type="text" class="form-control  bg-transparent text-white" placeholder="Search By Name">
                </div>
                <div id="searchByLetter" class="col-md-6">
                    <input onkeyup="searchByLetter(this.value)" type="text" class="form-control  bg-transparent text-white" placeholder="Search By First Letter">
                </div>
    `
}
$('#search').click(function(){
    
    searchInputs ();
    closeSideNavbar();

})

async function searchByName(word){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
    data = await data.json();
    let newArray = data.meals;
    displayMeals(newArray.slice(0,20))
}

async function searchByLetter(letter){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    data = await data.json();
    let newArray = data.meals;
    displayMeals(newArray.slice(0,20))
}

//*********************************** */

//contact us
// function contactInputs (){
//     document.getElementById("rowData").innerHTML  = `
//     <div class="row py-5 m-auto text-center text-black">
//                 <div  class="col-md-6 my-3">
//                     <input id="name" onkeyup="inputsValidation()"  type="text" class="form-control  " placeholder="Enter Your Name">
//                     <div id="incorrectName" ></div>
//                 </div>
//                 <div  class="col-md-6 my-3">
//                     <input id="email" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Email">
//                     <div id="incorrectEmail"></div>
//                     </div>
//                 <div  class="col-md-6 my-3">
//                     <input id="phone" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
//                     <div id="incorrectPhone"></div>
//                     </div>
//                 <div  class="col-md-6 my-3">
//                     <input id="age" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Age">
//                     <div id="incorrectAge"></div>
//                     </div>
//                 <div id="password" class="col-md-6 my-3">
//                     <input id="password" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
//                     <div id="incorrectPassword"></div>
//                     </div>
//                 <div  class="col-md-6 my-3">
//                     <input id="repassword" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
//                     <div id="incorrectRepassword"></div>
//                     </div>
//                 <div >
//                     <button id="submitBtn" disabled  class="btn btn-danger">Submit</button>
//                 </div>
//                 </div>
//     `
// }
// $('#contactUs').click(function(){
    
//     contactInputs ();
//     closeSideNavbar();

// })
// // function nameValidate(){
// //     if (nameRegex()==false){
// //         $('#incorrectName').innerHTML = '<span class="text-danger m-3">please enter valide name</span>'
// //     }else{
// //         return true
// //     }
// // }
// //********************* */
// //validation

// submitBtn = document.getElementById("submitBtn")


    

//     function inputsValidation() {
        
//             if (nameRegex()==false) {
//                 return document.getElementById("incorrectName").innerHTML = '<span class="text-danger m-3">please enter valid name</span>';
//             }
//             if (emailRegex()==false) {
//                 return  $('#incorrectEmail').innerHTML = '<span class="text-danger m-3">please enter valid name</span>';
//            }
//             if (phoneRegex()==false) {
//                 return document.getElementById("incorrectPhone").innerHTML = '<span class="text-danger m-3">please enter valid number</span>';

//             }
    
        
//              if (ageRegex()==false) {
//                 return document.getElementById("incorrectAge").innerHTML = '<span class="text-danger m-3">please enter valid age</span>';

//             } 
    
        
//              if (passwordRegex()==false) {
//                 return document.getElementById("incorrectPassword").innerHTML = '<span class="text-danger m-3">password must contain special character and minimum 8 letters</span>'

//             } 
             
//          if (repasswordRegex()==false) {
//                 return document.getElementById("incorrectRepassword").innerHTML = '<span class="text-danger m-3">make sure u enter the correct password</span>'

//             }
    
//             return true

//     }

//     //     if (nameRegex() &&
// //     emailRegex() &&
// //     phoneRegex() &&
// //     ageRegex() &&
// //     passwordRegex() &&
// //     repasswordRegex()) {
// //     submitBtn.removeAttribute("disabled")
// // } else {
// //     submitBtn.setAttribute("disabled", true)
// // }

//     if (inputsValidation()==true){
//         $('#submitBtn').removeAttr("disabled")
//     }
    
// function nameRegex(){
//     let regex = /^[a-zA-Z ]{3,}$/gi
//    return (regex.test($('#name').value))
// }
// function emailRegex(){
//     let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi
//    return (regex.test($('#email').value))
// }
// function phoneRegex(){
//     let regex = /^(002)?01[1205][0-9]{8}$/gi
//    return (regex.test($('#phone').value))
// }
// function ageRegex(){
//     let regex =/(16|17|18|19|[2-7][0-9])/gi
//    return (regex.test($('#age').value))
// }
// function passwordRegex(){
//     let regex =/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/gi
//    return (regex.test($('#password').value))
// }
// function repasswordRegex(){
//     return document.getElementById("repassword").value == document.getElementById("password").value

// }



// // function nameRegexxx(name){
// //     let regex = /^[a-zA-Z ]{3,}$/gi
// //    return (regex.test(name))
// // }
// // console.log(nameRegexxx('ahmed'));


function showContacts() {
    closeSideNavbar();
    document.getElementById("rowData").innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}