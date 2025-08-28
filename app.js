class BibleApi {
  constructor(resource) {
    this.resource = resource;
  }

  async getApi() {
    const response = await axios.get(this.resource, {
      headers: { "api-key": API_KEY },
    });
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
      for (const book of data.data) {
        const li = document.createElement("li");
        li.classList.add("book-item");

        const toggleBtn = document.createElement("button");
        toggleBtn.classList.add("book-toggle");
        toggleBtn.textContent = book.name;

        const chaptersDiv = document.createElement("div");
        chaptersDiv.classList.add("chapters");

        toggleBtn.addEventListener("click", () => {
          chaptersDiv.classList.toggle("active");
        });

        li.appendChild(toggleBtn);
        li.appendChild(chaptersDiv);
        document.getElementById("bookList").appendChild(li);
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
      const verses = data.data.passages;

      for (const verse of verses) {
        const h3 = document.createElement("h3");
        h3.textContent = verse.reference;

        const p = document.createElement("p");
        p.innerHTML = verse.content;

        p.classList.add("verse");
        document.getElementById("displayArea").appendChild(h3);
        document.getElementById("displayArea").appendChild(p);
      }
    });
  }
}

// Display bible chapters and verses base on the book

// accessing html element
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const bookList = document.getElementById("bookList");

const bibleapi = new BibleApi(
  "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/books"
);
const books = new BookList(
  "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/books"
);
books.displayAllBooks();

searchBtn.addEventListener("click", () => {
  const searchVerse = new SearchQuotation(
    `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/search?query=${searchInput.value}`
  );
  searchVerse.search();

  searchInput.value = "";
});

// testing api interface
// async function cl() {
//   const response = await axios.get("https://bible-api.com/data/kjv/GEN");
//   console.log(response.data);
// }

// cl();

axios
  .get("https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/books", {
    headers: { "api-key": API_KEY },
  })
  .then((res) => console.log(res.data.data))
  .catch((err) => console.error(err));
axios
  .get(
    "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/search?query={John 3:16}",
    {
      headers: { "api-key": API_KEY },
    }
  )
  .then((res) => console.log(res.data.data))
  .catch((err) => console.error(err));
