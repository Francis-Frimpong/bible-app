class BibleApi {
  constructor(resource) {
    this.resource = resource;
  }

  async getApi() {
    const response = await axios.get(this.resource);
    // console.log(response.data);
    return response.data;
  }
}

class BibleApp extends BibleApi {
  constructor(resource) {
    super(resource);
  }

  displayAllBooks() {
    this.getApi().then((data) => {
      for (const book of data.books) {
        const li = document.createElement("li");
        li.textContent = book.name;
        document.getElementById("bookList").appendChild(li);
      }
    });
  }

  async searchBook(link) {
    document.getElementById("displayArea").innerHTML = "";

    const response = await axios.get(link);
    const h3 = document.createElement("h3");
    h3.textContent = response.data.reference;

    const p = document.createElement("p");
    p.textContent = response.data.text;
    p.classList.add("verse");
    document.getElementById("displayArea").appendChild(h3);
    document.getElementById("displayArea").appendChild(p);
  }
}

// accessing html element
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const bibleapi = new BibleApi("https://bible-api.com/data/kjv");
bibleapi.getApi();

const books = new BibleApp("https://bible-api.com/data/kjv");
books.displayAllBooks();

searchBtn.addEventListener("click", () => {
  books.searchBook(
    `https://bible-api.com/${searchInput.value}?translation=kjv`
  );

  searchInput.value = "";
});
