class BibleApi {
  constructor(resource) {
    this.resource = resource;
  }

  async getApi() {
    const response = await axios.get(this.resource);
    return response.data;
  }
}

// Display bible books class
class BookList extends BibleApi {
  constructor(resource) {
    super(resource);
  }

  displayAllBooks() {
    this.getApi().then((data) => {
      for (const book of data.books) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.classList.add("book-name");
        span.textContent = book.name;

        li.appendChild(span);
        document.getElementById("bookList").appendChild(li);
      }
    });
  }

  renderVerse(e) {
    this.getApi().then((data) => {
      for (const book of data.books) {
        if (e.target.textContent === book.name) {
          new BibleApi(`https://bible-api.com/data/kjv/${book.id}`)
            .getApi()
            .then((data) => {
              for (const chapter of data.chapters) {
                // const h3 = document.createElement("h3");
                // h3.textContent = `Chapter ${chapter.chapter}`;
                // document.getElementById("displayArea").appendChild(h3);

                console.log(chapter.chapter);
              }
              console.log(data);
            });
        }
        // const li = document.createElement("li");
        // li.textContent = book.name;
        // document.getElementById("bookList").appendChild(li);
      }
    });
  }
}

// Search bible qoutation Class
class SearchQuotation extends BibleApi {
  constructor(resource) {
    super(resource);
  }

  search() {
    document.getElementById("displayArea").innerHTML = "";

    this.getApi().then((data) => {
      const h3 = document.createElement("h3");
      h3.textContent = data.reference;

      const p = document.createElement("p");
      p.textContent = data.text;
      p.classList.add("verse");
      document.getElementById("displayArea").appendChild(h3);
      document.getElementById("displayArea").appendChild(p);
    });
  }
}

// Display bible chapters and verses base on the book

// accessing html element
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const bookList = document.getElementById("bookList");

const bibleapi = new BibleApi("https://bible-api.com/data/kjv");
const books = new BookList("https://bible-api.com/data/kjv");
books.displayAllBooks();

searchBtn.addEventListener("click", () => {
  const searchVerse = new SearchQuotation(
    `https://bible-api.com/${searchInput.value}?translation=kjv`
  );
  searchVerse.search();

  searchInput.value = "";
});

bookList.addEventListener("click", (e) => {
  books.renderVerse(e);
});

// testing api interface
// async function cl() {
//   const response = await axios.get("https://bible-api.com/data/kjv");
//   console.log(response.data);
// }

// cl();
