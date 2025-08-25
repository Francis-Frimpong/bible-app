class BibleApi {
  constructor(resource) {
    this.resource = resource;
  }

  async getApi() {
    const response = await axios.get(this.resource);
    console.log(response.data);
    return response.data;
  }
}

class GetAllBooks extends BibleApi {
  constructor(resource) {
    super(resource);
  }

  displayAllBooks() {
    this.getApi().then((data) => {
      for (const book of data.books) {
        const li = document.createElement("li");
        li.textContent = book.name;
        document.getElementById("bookList").appendChild(li);
        console.log(book.name);
      }
    });
  }
}

const bibleapi = new BibleApi("https://bible-api.com/data/kjv");
bibleapi.getApi();

const displayBooks = new GetAllBooks("https://bible-api.com/data/kjv");
displayBooks.displayAllBooks();
