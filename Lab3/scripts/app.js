/* custom JavaScript goes here */

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
//Closure - limits scope leak

"use strict";

((core) =>
{
    /**
     * Inject the Navigation bar into the Header element and highlight the active link based on the pageName parameter
     *
     * @param {string} pageName
     */
    function loadHeader(pageName)
    {
      // inject the Header
      $.get("./Views/components/header.html", function(data)
      {
        $("header").html(data); // load the navigation bar

        toggleLogin(); // add login / logout and secure links

        $(`#${pageName}`).addClass("active"); // highlight active link

        // loop through each anchor tag in the unordered list and 
        // add an event listener / handler to allow for 
        // content injection
        $("a").on("click", function()
        { 
          $(`#${router.ActiveLink}`).removeClass("active"); // removes highlighted link
          router.ActiveLink = $(this).attr("id");
          loadContent(router.ActiveLink, ActiveLinkCallBack(router.ActiveLink));
          $(`#${router.ActiveLink}`).addClass("active"); // applies highlighted link to new page
          history.pushState({},"", router.ActiveLink); // this replaces the url displayed in the browser
        });

        // make it look like each nav item is an active link
        $("a").on("mouseover", function()
        {
          $(this).css('cursor', 'pointer');
        });
      });
    }

    /**
     * Inject page content in the main element 
     *
     * @param {string} pageName
     * @param {function} callback
     * @returns {void}
     */
    function loadContent(pageName, callback)
    {
      // inject content
      $.get(`./Views/content/${pageName}.html`, function(data)
      {
        $("main").html(data);

        callback();
      });
      
    }

    function loadFooter()
    {
      // inject the Footer
      $.get("./Views/components/footer.html", function(data)
      {
        $("footer").html(data);
      });
    }

    function displayHome()
    {
      let mainContent = document.querySelector("main");

      // Clear existing content
      mainContent.innerHTML = "";
      
      // Set document body class
      mainContent.className = "index";

      let imageDiv = document.createElement("div");
      imageDiv.className = "image-container"

      // Create a div elem for the home page content and set the class
      let contentDiv = document.createElement("div");
      contentDiv.className = "home-container"
      // Create an array with the elems for the content in the content div
      let contentArr = new Array();
      // Create elem for the header and push to the content array
      let header = document.createElement("h1");
      header.textContent = "Welcome to our Website - Explore, Discover and Enjoy!";
      contentArr.push(header);
      // Create an array for the paragraphs and push the to the content array
      let paragraphs = [
          "We are delighted to have you here. Explore our products, discover our services, and get to know more about our incredible team.",
          "Whether you're looking for information, inspiration, or just curious, we've got you covered. Feel free to navigate through the site, and if you have any questions, don't hesitate to reach out.",
          "Thank you for visiting, and we hope you enjoy your time on our website! You have any questions feel free to visit our about us page!"
      ];
      // Add each paragraph to the content array as a p elem
      paragraphs.forEach((paragraph) => {
          let p = document.createElement("p");
          p.textContent = paragraph;
          contentArr.push(p);
      })
      // Append all the elems in the content array to the content div
      for (let content of contentArr) {
          contentDiv.appendChild(content);
      }
      imageDiv.appendChild(contentDiv);
      // Append the content div to the body
      mainContent.appendChild(imageDiv); 
      
    }

    function displayAbout()
    {
      let mainContent = document.querySelector("main");

      // Clear existing content
      mainContent.innerHTML = "";

      // Create an elem for the header
      let header = document.createElement("h2");
      header.style = "text-align:center";
      header.textContent = "About Us";
      mainContent.appendChild(header);

      // Create an elem for the content div
      let contentDiv = document.createElement("div");
      contentDiv.className = "about-us";

      // Create an array for our team
      let team = [{
          name: "Andrew",
          image: "images/andrew.jpg", // Source: https://www.pinterest.ca/pin/588704982569796070
      },
      {
          name: "Yashvi",
          image: "images/Yashvi.jpg", // Source: https://www.pinterest.ca/pin/588704982569796118

      },
      {
          name: "Justin",
          image: "images/Justin.jpg", // Source: https://www.pinterest.ca/pin/588704982569796070
      }];

      for (let member of team) {
          let detailsDiv = document.createElement("div");
          detailsDiv.className = "details";

          let cardDiv = document.createElement("div");
          cardDiv.className = "card";

          let img = document.createElement("img");
          img.src = member.image;
          img.alt = member.name;
          img.style = "width:100%";
          cardDiv.appendChild(img);

          let nameDiv = document.createElement("div");
          nameDiv.className = "container";
          cardDiv.appendChild(nameDiv);

          let nameH2 = document.createElement("h2");
          nameH2.textContent = member.name;
          nameDiv.appendChild(nameH2);

          detailsDiv.appendChild(cardDiv);
          contentDiv.appendChild(detailsDiv);
      }
      mainContent.appendChild(contentDiv);

    }

    function displayProjects()
    {
      let mainContent = document.querySelector("main");

      // Clear existing content
      mainContent.innerHTML = "";

      // Create an array of objects for the products content and images
      let products = [
        {
            content: "One of our teams past projects, was a Database for Lake Ridge Healthcare Centre, located in Oshawa Ontario. The goal of this project was to improve functionality and security of information in the database. We included information on rooms, charges, patients, cost centres, and much more.",
            image: "images/Database.jpg", // Source: https://www.pinterest.ca/pin/588704982569774273
            imageAlt: "Database",
        },
        {
            content: "Another one of our projects is a Website, used for a companies sales people to record their clients, and calls between them. It included a fully function database, that took into account emails, and passwords to allow users to log in and out safely. We also implemented hashing on passwords, for secure logins.",
            image: "images/webpage.jpg",
        },
        {
            content: "We also created a testing file, used to test a clothing sales site, for errors in searching, purchasing and selection of clothing. The testing file was able to move through the website on its own, finding errors along the way, and giving an error message for said errors.",
            image: "images/webpage2.jpg",
            imageAlt: "Webpage2",
        }
    ];
    // Add the products to the body as div elems
    for (let product of products) {
        let div = document.createElement("div");
        div.className = "products";

        let p = document.createElement("p");
        p.textContent = product.content;

        let img = document.createElement("img");
        img.src = product.image;
        // Use the imageAlt value, if its undefined use the name of the image file
        img.alt = product.imageAlt || product.image.split("/").pop().split(".")[0];
        // Randomly select whether the image or paragraph is appended first
        if (Math.random() > 0.5) {
            div.appendChild(img);
            div.appendChild(p);
        } else {
            div.appendChild(p);
            div.appendChild(img);
        };

        mainContent.appendChild(div);
      }
      
    }

    function displayServices()
    {   
      let mainContent = document.querySelector("main");

      // Clear existing content
      mainContent.innerHTML = "";
      // Create the div for the services
      let servicesDiv = document.createElement("div");
      servicesDiv.className = "servicesPage";
      // Create an array of objects for the service content and images
      let services = [
          {
              content: "Web Development: We can create well-functioning, appealing and inexpensive websites for consumers as each member of our team has much experience in building web applications, and sites alike. Whether you wish to display information about your product or service or to create a database/hub for your business, we can create a state-of-the-art site to meet all of your needs.",
              image: "images/image1.gif", // Source: https://www.pinterest.ca/pin/588704982569774068
              imageAlt: "Animation1",
          },
          {
              content: "Test Automation: Our team can create testing software used to evaluate the performance of clients' websites, looking at all possible issues with each part of the site. This ensures sites meet the function they have been created for and leave users satisfied.",
              image: "images/image2.gif", // Source: https://www.pinterest.ca/pin/588704982569774177
              imageAlt: "Animation2",

          },
          {
              content: "Custom Programming: We can also take requests for different coding projects, such as a database, website, windows application, and much more.",
              image: "images/image3.gif", // Source: https://www.pinterest.ca/pin/588704982569774273
              imageAlt: "Animation3",
          }
      ];
      // Add the services to the services div
      for (let service of services) {
          let div = document.createElement("div");
          div.className = "products";

          let p = document.createElement("p");
          p.textContent = service.content;

          let img = document.createElement("img");
          img.src = service.image;
          // Use the imageAlt value, if its undefined use the name of the image file
          img.alt = service.imageAlt || service.image.split("/").pop().split(".")[0];
          // Randomly select whether the image or paragraph is appended first
          if (Math.random() > 0.5) {
              div.appendChild(img);
              div.appendChild(p);
          } else {
              div.appendChild(p);
              div.appendChild(img);
          };
          servicesDiv.appendChild(div);
        }
        mainContent.appendChild(servicesDiv); 
    }

    function testFullName()
    {
      let messageArea = $("#messageArea").hide();
      let fullNamePattern = /([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*/;

        
        $("#fullName").on("blur", function()
        {
          if(!fullNamePattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Full Name. This must include at least a Capitalized first name followed by a Capitlalized last name.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testContactNumber()
    {
      let messageArea = $("#messageArea");
      let contactNumberPattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        
        $("#contactNumber").on("blur", function()
        {
          if(!contactNumberPattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Contact Number. Country code and area code are both optional");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testEmailAddress()
    {
      let messageArea = $("#messageArea");
      let emailAddressPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
        
        $("#emailAddress").on("blur", function()
        {
          if(!emailAddressPattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Email Address.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function formValidation()
    {
      testFullName();
      testContactNumber();
      testEmailAddress();
    }

    function displayContact()
    {
      // form validation
      formValidation();

        $("#sendButton").on("click", (event)=> 
        {
          if($("#subscribeCheckbox")[0].checked)
          {
            let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);

            if(contact.serialize())
            {
              let key = contact.FullName.substring(0, 1) + Date.now();

              localStorage.setItem(key, contact.serialize());
            }
          }
        });
    }

    function displayContactList() 
    {
      // don't allow visitors to go here
      authGuard();

      if (localStorage.length > 0) 
      {

        let contactList = document.getElementById("contactList");

        let data = "";

        let keys = Object.keys(localStorage);
         
        let index = 1;

        for (const key of keys) 
        {
          let contactData = localStorage.getItem(key);

          let contact = new core.Contact();
          contact.deserialize(contactData);

          data += `<tr>
          <th scope="row" class="text-center">${index}</th>
          <td>${contact.FullName}</td>
          <td>${contact.ContactNumber}</td>
          <td>${contact.EmailAddress}</td>
          <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
          <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
          </tr>`;

          index++;
        }

        contactList.innerHTML = data;

        $("button.edit").on("click", function(){
          // location.href = "/edit#" + $(this).val();
          loadHeader('edit#'+ $(this).val() );
          loadContent('edit#' + $(this).val(), ActiveLinkCallBack('edit#' + $(this).val()));
         });  

         $("button.delete").on("click", function(){
           if(confirm("Are you sure?"))
           {
            localStorage.removeItem($(this).val());
           }
          //  location.href = "/contact-list"; // refresh the page
          loadHeader('contact-list');
          loadContent('contact-list', ActiveLinkCallBack('contact-list'));
         });

         $("#addButton").on("click", function() 
         {
          // location.href = "/edit";
          loadHeader('edit');
          loadContent('edit', ActiveLinkCallBack('edit'));
         });
      }
    }

    function displayEdit()
    {
      let key = location.hash.substring(1);

      let contact = new core.Contact();

      // check to ensure that the key is not empty
      if(key != "")
      {
        // get contact info from localStorage
        contact.deserialize(localStorage.getItem(key));

        // display contact information in the form
        $("#fullName").val(contact.FullName);
        $("#contactNumber").val(contact.ContactNumber);
        $("#emailAddress").val(contact.EmailAddress);
      }
      else
      {
        // modify the page so that it shows "Add Contact" in the header 
        $("main>h1").text("Add Contact");
        // modify edit button so that it shows "Add" as well as the appropriate icon
        $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);
      }

      // form validation
      formValidation();
      
     $("#editButton").on("click", function() 
        {
            // check to see if key is empty
          if(key == "")
          {
            // create a new key
            key = contact.FullName.substring(0, 1) + Date.now();
          }

          // copy contact info from form to contact object
          contact.FullName = $("#fullName").val();
          contact.ContactNumber = $("#contactNumber").val();
          contact.EmailAddress = $("#emailAddress").val();

          // add the contact info to localStorage
          localStorage.setItem(key, contact.serialize());

          // return to the contact list
          // location.href = "/contact-list";
          loadHeader('contact-list');
          loadContent('contact-list', ActiveLinkCallBack('contact-list'));
          
        });

      $("#cancelButton").on("click", function()
      {
        // return to the contact list
        // location.href = "/contact-list";
        loadHeader('contact-list');
        loadContent('contact-list', ActiveLinkCallBack('contact-list'));
      });
    }

    /**
     * Processes the Login and performs validation
     */
    function performLogin()
    {
      let messageArea = $("#messageArea");
      messageArea.hide();

      let username = $("#username");
      let password = $("#password");
      let success = false;
      let newUser = new core.User();

      // use ajax to access the json file
      $.get("./Data/users.json", function(data)
      {
        // check each user in the users.json file  (linear search)
        for (const user of data.users) 
        {
          if(username.val() == user.Username && password.val() == user.Password)
          {
            newUser.fromJSON(user);
            success = true;
            break;
          }
        }

        // if username and password matches - success... then perform login
        if(success)
        {
          // add user to session storage
          sessionStorage.setItem("user", newUser.serialize());

          // hide any error message
          messageArea.removeAttr("class").hide();

          // redirect user to secure area - contact-list.html
          // location.href = "/contact-list";
          loadHeader('contact-list');
          loadContent('contact-list', ActiveLinkCallBack('contact-list'));
        }
        else
        {
          // display an error message
          username.trigger("focus").trigger("select");
          messageArea.show().addClass("alert alert-danger").text("Error: Invalid login information");
        }
      });
    }

    /**
     * Displays and Processes the Login page
     */
    function displayLogin()
    {

      $("#loginButton").on("click", function() 
      {
        performLogin();
      });

      $("#password").on("keypress", function(event)
      {
        if(event.key == "Enter")
        {
          performLogin();
        }
        });

      $("#cancelButton").on("click", function()
      {
        // clear the login form
        document.forms[0].reset();
        // return to the home page
        // location.href = "/home";
        loadHeader('home');
        loadContent('home', ActiveLinkCallBack('home'));
      });

    }

    function displayRegister()
    {
      let mainContent = document.querySelector("main");

      // Clear existing content
      mainContent.innerHTML = "";

      let registerDivMain = document.createElement("div");
        registerDivMain.id = "UserRegister";

        // Create an elem for the contact form
        let registerForm = document.createElement("form");
        registerForm.id = "registration-form";
        registerForm.name = "registration-form";
        registerForm.className = "row g-3";


        let registerHeader = document.createElement("h1");
        registerHeader.innerHTML = "Register";
        // Create a paragraph for the login link
        let registerDescription = document.createElement("p");
        registerDescription.innerHTML = "Create your own account  It's free and it only takes a minute";
        registerForm.appendChild(registerHeader);
        registerForm.appendChild(registerDescription);

        let errorParagraph = document.createElement("p");
        errorParagraph.id = "ErrorMessage";
        errorParagraph.style.display = "none";
        registerForm.appendChild(errorParagraph);

        // Create an array for the input objects
        let inputs = [{
            id: "inputFirstName",
            name: "First Name",
            type: "text",
            colClass: "col-md-6",
        },
        {
            id: "inputLastName",
            name: "Last Name",
            type: "text",
            colClass: "col-md-6",
        },
        {
            id: "inputEmail",
            name: "Email Address",
            type: "email",
            colClass: "col-12",
        },
        {
            id: "inputPassword",
            name: "Password",
            type: "password",
            colClass: "col-12",
        },
        {
            id: "inputConfirmPassword",
            name: "Confirm Password",
            type: "password",
            colClass: "col-12",
        }];

        // Add each input object to the form
        for (let inputObj of inputs) {
            let div = document.createElement("div");
            div.className = `form-group ${inputObj.colClass}`;

            let label = document.createElement("label");
            label.setAttribute("for", inputObj.id);
            label.className = inputObj.classes
            label.textContent = inputObj.name;
            div.appendChild(label);

            let input = document.createElement("input");
            input.type = inputObj.type;
            input.className = "form-control";
            input.id = inputObj.id;
            input.placeholder = inputObj.name;
            div.appendChild(input);

            registerForm.appendChild(div);
        }

        // Create an element for the submit button
        let submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.className = "btn btn-primary";
        submitButton.textContent = "Register";

        // Add the button to the form
        registerForm.appendChild(submitButton);

        // Create a paragraph for the login link
        let loginLinkParagraph = document.createElement("p");
        loginLinkParagraph.innerHTML = 'Already Have an account? <a href="./login.html">Login Here!</a>';

        registerForm.appendChild(loginLinkParagraph);

        // Create an elem for the error messages div
        let errorMessagesDiv = document.createElement("div");
        errorMessagesDiv.id = "ErrorMessage";
        errorMessagesDiv.style.display = "none"; // Initially hide the error messages

        // Append the error messages div to the body
        document.body.appendChild(errorMessagesDiv);

        // Validate First Name and Last Name length on form submission
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Clear previous error messages
            errorMessagesDiv.innerHTML = "";
            errorMessagesDiv.style.display = "none";

            let firstNameInput = document.getElementById("inputFirstName");
            let lastNameInput = document.getElementById("inputLastName");
            let emailAddressInput = document.getElementById("inputEmail");
            let symbol = "@";
            let passwordInput = document.getElementById("inputPassword");
            let passwordConfirmInput = document.getElementById("inputConfirmPassword");

            // Validate First Name length
            if (firstNameInput.value.length < 2) {
                displayError("First Name must be at least 2 characters.");
                return;
            }
            // Validate Last Name length
            if (lastNameInput.value.length < 2) {
                displayError("Last Name must be at least 2 characters.");
                return;
            }
            // Validate Email Address @ Symbol
            if (!emailAddressInput.value.includes(symbol)) {
                displayError("Email Address must contain '@'.");
                return;
            }
            // Validate Email Address Length
            if (emailAddressInput.value.length <= 8) {
                displayError("Email Address cannot be less than 8 characters.");
                return;
            }
            // Validate Password Length
            if (passwordInput.value.length < 6) {
                displayError("Your password must be greater than 6 characters.");
                return;
            }
            // Validate Password matches Confirm Password
            if (passwordInput.value !== passwordConfirmInput.value) {
                displayError("Password and Confirm Password must be the same.");
                return;
            }
            // If there is no validation errors...
            // Clear the error messages
            errorParagraph.textContent = "";
            errorParagraph.style.display = "none";
            // Create an instance of the User class
            let user = new User(
                firstNameInput.value,
                lastNameInput.value,
                `${firstNameInput.value}.${lastNameInput.value}`,
                emailAddressInput.value,
                passwordInput.value
            );
            // Display the User object in console
            console.log(user);
            // Finally, clear the form
            firstNameInput.value = "";
            lastNameInput.value = "";
            emailAddressInput.value = "";
            passwordInput.value = "";
            passwordConfirmInput.value = "";
        });

        function displayError(errorMessage) {
            // Display error message in the div      
            errorParagraph.textContent = errorMessage;
            errorParagraph.style.display = "block";
        }

        registerDivMain.appendChild(registerForm);
        mainContent.appendChild(registerDivMain);

    }

    function toggleLogin()
    {
      // if user is logged in
      if(sessionStorage.getItem("user"))
      {
        // swap out the login link for logout
        $("#loginListItem").html(
        `<a id="logout" class="nav-link" aria-current="page"><i class="fas fa-sign-out-alt"></i> Logout</a>`
        );

        $("#logout").on("click", function()
        {
          // perform logout
          sessionStorage.clear();

          // redirect back to login
          // location.href = "/login";
          loadHeader('login');
          loadContent('login', ActiveLinkCallBack('login'));
        });

        // make it look like each nav item is an active link
        $("#logout").on("mouseover", function()
        {
          $(this).css('cursor', 'pointer');
        });
       
        $(`<li class="nav-item">
        <a id="contact-list" class="nav-link" aria-current="page"><i class="fas fa-users fa-lg"></i> Contact List</a>
      </li>`).insertBefore("#loginListItem");
      $(`<li class="nav-item">
      <a id="taskList" class="nav-link" aria-current="page"><i class="fas fa-tasks fa-lg"></i> Task List</a>
    </li>`).insertBefore("#contactListItem");
      }

      else
      {
        // swap out the login link for logout
        $("#loginListItem").html(
          `<a id="login" class="nav-link" aria-current="page"><i class="fas fa-sign-in-alt"></i> Login</a>`
          );
      }
    }

    function authGuard()
    {
      if(!sessionStorage.getItem("user"))
      {
      // redirect back to login page
      // location.href = "/login";
      loadHeader('login');
      loadContent('login', ActiveLinkCallBack('login'));
      }
    }

    function display404()
    {
      let mainContent = document.querySelector("main");

      // Clear existing content
      mainContent.innerHTML = "";

      let div = document.createElement("div");
        div.className = "container";

        let header = document.createElement("h2");
        header.style = "text-align:center";
        header.textContent = "404 - Page Not Found"

        div.appendChild(header);

        mainContent.appendChild(div);
      

    }

    function ActiveLinkCallBack(activeLink)
    {
      switch (activeLink) 
      {
        case "home": return displayHome;
        case "about": return displayAbout;
        case "projects": return displayProjects; 
        case "services": return displayServices;
        case "contact": return displayContact;
        case "contact-list": return displayContactList;
        case "edit": return displayEdit;
        case "login": return displayLogin;
        case "register": return displayRegister;
        case "404": return display404; 
        case "taskList": return DisplayTaskList; 
        default:
          console.error("ERROR: callback does not exist: " + activeLink);
          break;
      }
    }

    

    /**
     * This function adds a new Task to the TaskList
     */
    function AddNewTask() 
    {
      let messageArea = $("#messageArea");
      messageArea.hide();
      let taskInput = $("#taskTextInput");

      if (taskInput.val() != "" && taskInput.val().charAt(0) != " ") 
      {
        let newElement = `
              <li class="list-group-item" id="task">
              <span id="taskText">${taskInput.val()}</span>
              <span class="float-end">
                  <button class="btn btn-outline-primary btn-sm editButton"><i class="fas fa-edit"></i>
                  <button class="btn btn-outline-danger btn-sm deleteButton"><i class="fas fa-trash-alt"></i></button>
              </span>
              <input type="text" class="form-control edit-task editTextInput">
              </li>
              `;
        $("#task-List").append(newElement);
        messageArea.removeAttr("class").hide();
        taskInput.val("");
      } 
      else 
      {
        taskInput.trigger("focus").trigger("select");
        messageArea.show().addClass("alert alert-danger").text("Please enter a valid Task.");
      }
    }

    /**
     * This function is the Callback function for the TaskList
     *
     */
    function DisplayTaskList()
    {
      
        // don't allow visitors to go here
        authGuard();

        let messageArea = $("#messageArea");
        messageArea.hide();
        let taskInput = $("#taskTextInput");

        // add a new Task to the Task List
        $("#newTaskButton").on("click", function()
        {         
            AddNewTask();
        });

        taskInput.on("keypress", function(event)
        {
          if(event.key == "Enter")
          {
            AddNewTask();
          }
         });

        // Edit an Item in the Task List
        $("ul").on("click", ".editButton", function(){
           let editText = $(this).parent().parent().children(".editTextInput");
           let text = $(this).parent().parent().text();
           editText.val(text).show().trigger("select");
           editText.on("keypress", function(event)
           {
            if(event.key == "Enter")
            {
              if(editText.val() != "" && editText.val().charAt(0) != " ")
              {
                editText.hide();
                $(this).parent().children("#taskText").text(editText.val());
                messageArea.removeAttr("class").hide();
              }
              else
              {
                editText.trigger("focus").trigger("select");
                messageArea.show().addClass("alert alert-danger").text("Please enter a valid Task.");
              }
            }
           });
        });

        // Delete a Task from the Task List
        $("ul").on("click", ".deleteButton", function(){
            if(confirm("Are you sure?"))
            {
                $(this).closest("li").remove();
            }    
        });
    }

    function Start()
    {
        console.log("App Started...");

        loadHeader(router.ActiveLink);
      
        loadContent(router.ActiveLink, ActiveLinkCallBack(router.ActiveLink));


        loadFooter();
    }

    window.addEventListener("load", Start);

    core.Start = Start;

})(core || (core={}));