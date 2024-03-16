/*
Lab 3
Group Members:
- Yashvi Patel: 100900705
- Justin Wastle: 100869386
- Andrew Mekhail: 100828858
Date: March 15, 2024 
*/

"use strict";

(() =>{
    // check if the user is already logged in
    if(sessionStorage.getItem("user"))
    {
    // redirect to the secure area
    location.href = "contact-list.html";
    }
})();
