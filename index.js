let AddBook = document.querySelector(".AddBookButton");
let Popup = document.querySelector(".Popup");

let PopupActive = false;

let originalBook = document.querySelector(".GridItem").cloneNode(true);
let bookGrid = document.querySelector(".BookGrid");
let TitleBook = document.querySelector("#Title");
let AuthorBook = document.querySelector("#Author");
let PagesBook = document.querySelector("#Pages");
let submitBook = document.querySelector(".PopupSubmit");

console.log(localStorage.getItem("Books"));

if (localStorage.getItem("Books") == null){
    localStorage.setItem("Books",JSON.stringify([]));
}

let Books = JSON.parse(localStorage.getItem("Books"));
console.log(Books);


AddBook.onclick = function(){
    Popup.style = "display: flex";
    PopupActive = true;
}

Popup.onclick = function(event){
    if (event.target.className == "Popup"){
        Popup.style = "display: none";
    }
}

function createBook(title,author,pages,currentpage){
    let Book = new Object();
    Book.title = title;
    Book.author = author;
    Book.pages = pages;
    Book.currentpage = currentpage;
    return Book;
}

function loadBooks(){
    for (let z = bookGrid.children.length ; z > 0; z--){
        if(bookGrid.children[z] != null){
            bookGrid.children[z].remove();
        }
    }
    let Bookz = JSON.parse(localStorage.getItem("Books"));
    for(let i = 0 ; i < Bookz.length;i++){
        let newBook = originalBook.cloneNode(true);
        let gFlex = newBook.querySelector(".GridFlex");
        let Title = gFlex.querySelector(".ItemTitle");
        let Author = gFlex.querySelector(".ItemAuthor");
        let Pages = gFlex.querySelector(".ItemPages");
        let SliderPercent = gFlex.querySelector(".ItemSlider").querySelector(".SliderDisplay").querySelector(".SliderPercent");
        let Slider = gFlex.querySelector(".ItemSlider").querySelector(".Slider").querySelector(".SliderItem");
        let SliderMeat = gFlex.querySelector(".ItemSlider").querySelector(".SliderDisplay").querySelector(".SliderMeat");
        let removeBook = newBook.querySelector(".ItemSides").querySelector(".ItemRemove");
        Slider.max = Bookz[i].pages;
        Slider.value = Bookz[i].currentpage;

        Title.textContent = '\"' + Bookz[i].title + '\"';
        Author.textContent = Bookz[i].author;
        Pages.textContent = Bookz[i].pages + " pages";
        SliderPercent.textContent = (Bookz[i].currentpage + "/" + Bookz[i].pages);
        SliderMeat.style = ("width: " + (Bookz[i].currentpage / Bookz[i].pages) * 100 + "%;")

        Slider.addEventListener("input",function(){
            Bookz[i].currentpage = Slider.value;
            SliderPercent.textContent = (Bookz[i].currentpage + "/" + Bookz[i].pages);
            SliderMeat.style = ("width: " + (Bookz[i].currentpage / Bookz[i].pages) * 100 + "%;")
        })

        removeBook.onclick = function(){
            let Shelf = JSON.parse(localStorage.getItem("Books"));
            let load = false;
            for(let r = 0 ; r < Shelf.length;r++){
                if (('\"'+ Shelf[r].title+'\"') == Title.textContent){
                    Shelf.splice(r,1);
                    load = true;
                }
            }
            localStorage.setItem("Books",JSON.stringify(Shelf));
            if (load == true){
                loadBooks();
            }
        }
        

        bookGrid.appendChild(newBook);
        newBook.style = "display:flex";
    }
}

submitBook.onclick = function(){
    let Shelf = JSON.parse(localStorage.getItem("Books"));
    let canpass = true;
    for (let i = 0 ; i < Shelf.length;i++){
        if (Shelf[i].title == TitleBook.value){
            canpass = false;
        }
    }
    if (TitleBook.value != "" && AuthorBook.value != "" && PagesBook.value != "" && canpass == true){
        let Title = TitleBook.value;
        let Author = AuthorBook.value;
        let Pages = PagesBook.value;

        let NewBook = createBook(Title,Author,Pages,0);

        let currentData = JSON.parse(localStorage.getItem("Books"));
        currentData.push(NewBook);
        localStorage.setItem("Books",JSON.stringify(currentData));

        loadBooks();
        Popup.style = "display: none";
        TitleBook.value = "";
        AuthorBook.value = "";
        PagesBook.value = "";
    }
    else{
        window.alert("Book Already Exist. Fields cannot be left empty.")
    }
}

loadBooks();

