var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var deleteBtns;
var visitBtns;
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
var bookmarks = [];


var currentIndex ;
//Read: reading the data stored in local storage and display it
if(JSON.parse(localStorage.getItem('bookmarkList')) != null){
    bookmarks = JSON.parse(localStorage.getItem('bookmarkList'));
    display();
    console.log(bookmarks);
}



//Create ::
function addBookmark()
{
  if(siteName.classList.contains("is-valid") && siteURL.classList.contains("is-valid")) {
      let Bookmark = {
        siteName:capitalize(siteName.value),
        siteURL:siteURL.value
      };

      let exists = bookmarks.some(item => item.siteName === Bookmark.siteName);
      if(!exists){
        bookmarks.push(Bookmark);
      window.localStorage.setItem('bookmarkList',JSON.stringify(bookmarks));
      display();
      clearFields();
      siteName.classList.remove("is-valid");
      siteURL.classList.remove("is-valid");
      }else{
        showUnique();
        clearFields();
        siteName.classList.remove("is-valid");
        siteURL.classList.remove("is-valid");
      }
      
      
    }
    else{
      showMessge();
    }
  }
  


// display 
function display(){
  var userURL = bookmarks[i]?.siteURL;
  var httpsRegex = /^https?:\/\//g;
  if (httpsRegex.test(userURL)) {
    var validURL = userURL;
     fixedURL = validURL
      .split("")
      .splice(validURL.match(httpsRegex)[0].length)
      .join("");
  } else {
    var fixedURL = userURL;
    validURL = `https://${userURL}`;
  }
  
  var show = '';
        for(var i = 0; i < bookmarks.length;i++){
        show += `
        <tr>
              <td>${i + 1}</td>
              <td>${bookmarks[i]?.siteName}</td>              
              <td>
              <button id = 'vis' class="btn btn-visit" data-index="${i}">
                  <i class="fa-solid fa-eye pe-2"></i>Visit
                </button>
              </td>
              <td>
                <button onclick = 'deleteBookmark(${i})'  class="btn btn-delete pe-2" data-index="${i}">
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </button>
              </td>
          </tr>`
        }
    
    document.getElementById('tableContent').innerHTML = show;

    // // =====> Visit Function
visitBtns = document.querySelectorAll(".btn-visit");
if (visitBtns) {
  for (var l = 0; l < visitBtns.length; l++) {
    visitBtns[l].addEventListener("click", function (e) {
      visitWebsite(e);
    });
  }
}

}

//capitalizing site name
function capitalize(str) {
  let strArr = str.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}
//clear
function clearFields(){
  siteName.value = '';
  siteURL.value = '';
      
}


//delete
function deleteBookmark(index){
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarkList',JSON.stringify(bookmarks));
  display();
}




function visitWebsite(e) {
  var websiteIndex = e.target.dataset.index;
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmarks[websiteIndex]?.siteURL)) {
    open(bookmarks[websiteIndex].siteURL);
  } else {
    open(`https://${bookmarks[websiteIndex]?.siteURL}`);
  }
}



siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validate(siteURL, urlRegex);
});


var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}



function showMessge()
{

  Swal.fire({
    html: "<h3 style='color:red'> Site Name or Url is not valid <br><br><span style = 'color:deeppink'> Site name must contain <br><br> at least 3 characters </span></h3>",
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
    }
  });

}



function showUnique(){
  Swal.fire({
    html: "<h3 style='color:red'>Bookmark is already found<br><br>Pleas ! Type Unique URL</h3>",
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
    }
  });
}