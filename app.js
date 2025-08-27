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
    this.getApi()
      .then((data) => {
        const chapterRequests = []; // collect all chapter API calls

        for (const book of data.books) {
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

          // store chapter request for this book
          chapterRequests.push(
            axios
              .get(`https://bible-api.com/data/kjv/${book.id}`)
              .then((res) => {
                // render chapters once data comes back
                for (const chapter of res.data.chapters) {
                  const chapterBtn = document.createElement("button");
                  chapterBtn.classList.add("chapter-btn");
                  chapterBtn.textContent = `${book.name} ${chapter.chapter}`;
                  chaptersDiv.appendChild(chapterBtn);
                }
              })
          );
        }

        // wait for all chapters requests to finish
        return Promise.all(chapterRequests);
      })
      .catch((err) => console.error(err));
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

// testing api interface
async function cl() {
  const response = await axios.get("https://bible-api.com/data/kjv/GEN");
  console.log(response.data);
}

cl();
