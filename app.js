const container = document.getElementById ("container");
const newBook = document.getElementById ("newBook");
const submitBook = document.getElementById ("submitBook");
const addSection = document.getElementById("addBook");
const form = document.getElementById("form");
const library = document.getElementById ("library");
container.appendChild(library);
const bookTitle = document.getElementById("book_title");
const bookAuthor = document.getElementById("book_author");
const bookPages = document.getElementById("book_pages");
const bookRead = document.getElementById("book_yes");


newBook.addEventListener ("click", function (e){
    if (addSection.style.display == "block"){
        addSection.style.display = "none";
    } else {addSection.style.display = "block";
}
});


submitBook.addEventListener ("click", function (e){ 
    addBook ();
    form.reset();
    render();
    addSection.style.display = "none"; 
});



let myLibrary = [];

function Book (title, author, pages, read){

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;   
}

Book.prototype.info = function() {
    let readStatus = (this.read ? "has been read" : "not read yet"); 
    return this.title  + "\n by \n"+ this.author + "\n " + this.pages + " pages \n\n" + this.read  +"\n\n";;
}
    


function addBooktoLibrary (element){
    myLibrary.push(element);
}




function removeFromLibrary(e) {
    const book = e.target.parentElement;
        myLibrary.splice(book.getAttribute("data-value"), 1);
        book.parentElement.removeChild(book);
        setLocalStorage();
    }


function render() {
     if (library.innerHTML !== "") {
         library.innerHTML = "";
     }

    for (i = 0; i< myLibrary.length ; i++) {
        const card = document.createElement("div");
        
        
    library.appendChild(card).className = "card";

      const titleComponent = document.createElement('h4');
      const authorComponent = document.createElement('h5');
      const pagesComponent = document.createElement('h6');
      const readComponent = document.createElement('h6');

      titleComponent.textContent = myLibrary[i].title; 
      authorComponent.textContent = myLibrary[i].author;
      pagesComponent.textContent = myLibrary[i].pages + " pages";
      readComponent.textContent = readStatus(myLibrary[i].read);
     

      card.appendChild(titleComponent);
      card.appendChild(authorComponent);
      card.appendChild(pagesComponent);
      card.appendChild(readComponent);
      

        // give each card a data attribute representing the index to help with removal of cards
        card.setAttribute ("data-value", i);

        btn = document.createElement("BUTTON");   
        btn.innerHTML = "X";   
        btn.setAttribute("id", "delete")                
        card.appendChild(btn); 
        btn.addEventListener("click", function (e){
            removeFromLibrary(e);
            render();
        });
        const readButtonElement = document.createElement('button');
    readButtonElement.classList.add('read-button');
    readButtonElement.innerText = " ✺ "
    readButtonElement.addEventListener('click', changeReadStatus);
    card.appendChild(readButtonElement);
    } 

    
    
}
render();

function readStatus(CurrentReadStatus) {
    if (CurrentReadStatus) {
      return "read";
    } else {
      return "not read yet";
    }
  }



  function changeReadStatus() {
    const index = this.parentNode.getAttribute("data-value");
    if (myLibrary[index].read) {
      myLibrary[index].read = false;
    } else {
      myLibrary[index].read = true;
    }
    render();
  }

  // obtain reading status of book from forms radio buttons
  function readFormChoice() {
    let selectedValue;
  
    const choices = document.querySelectorAll('input[name="read"]');
  
    for (const choice of choices) {
      if (choice.checked) {
        selectedValue = choice.value;
        break;
      }
    }
  
    if (selectedValue === "true") {
      return true;
    } else {
      return false;
    }
  } 

function addBook (){
let book = new Book (
bookTitle.value, 
bookAuthor.value, 
bookPages.value,
(readFormChoice()),
)
myLibrary.push(book);
setLocalStorage();
};

function setLocalStorage() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
  }

siddartha = new Book ("Siddartha", "Hermann Hesse" , 200, false);
theDispossessed = new Book ("The Dispossessed", "Ursula Le Guin", 540, true)

function onPageLoad() {
    addBooktoLibrary(siddartha);
    addBooktoLibrary(theDispossessed);
    render();
    if(localStorage.getItem('library')) {
      myLibrary = JSON.parse(localStorage.getItem('library'));
      render();
    } 
  }
onPageLoad();