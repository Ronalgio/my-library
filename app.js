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

function Book (title, author, pages, read) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function (){
        return title  + "\n by \n"+ author + "\n " + pages + " pages \n\n" + read  +"\n\n";
    }
}

siddartha = new Book ("Siddartha", "Hermann Hesse" , "200", "read");
theDispossessed = new Book ("The Dispossessed", "Ursula Le Guin", "540", "read")
onTheRoad = new Book ("On The Road", "Jack Kerouac", "450", "read")
thePofN = new Book ("The Power of Now", "Eckhart Tolle" , "170", "not read yet");

function addBooktoLibrary (element){
    myLibrary.push(element);
}
addBooktoLibrary(siddartha);
addBooktoLibrary(theDispossessed);
addBooktoLibrary(onTheRoad);
addBooktoLibrary(thePofN);




function removeFromLibrary(e) {
    const book = e.target.parentElement;
        myLibrary.splice(book.getAttribute("data-value"), 1);
        book.parentElement.removeChild(book);
    }


function render() {
     if (library.innerHTML !== "") {
         library.innerHTML = "";
     }

    for (i = 0; i< myLibrary.length ; i++) {
        let cell = document.createElement("div");
        cell.innerText = (myLibrary[i].info());
        library.appendChild(cell).className = "card";
        cell.setAttribute ("data-value", i);
        btn = document.createElement("BUTTON");   
        btn.innerHTML = "Delete";                   
        cell.appendChild(btn); 
        btn.addEventListener("click", function (e){
            removeFromLibrary(e);
            render();
        });
    }
}
render();


function addBook (){
book = new Book (
bookTitle.value, 
bookAuthor.value, 
bookPages.value,
(book_yes.checked ? book_yes.value : book_no.value ),
)
myLibrary.push(book);
};


