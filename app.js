// class for call api
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
      const allBooks = data.data;
      const canonicalBooks = [
        "Genesis",
        "Exodus",
        "Leviticus",
        "Numbers",
        "Deuteronomy",
        "Joshua",
        "Judges",
        "Ruth",
        "1 Samuel",
        "2 Samuel",
        "1 Kings",
        "2 Kings",
        "1 Chronicles",
        "2 Chronicles",
        "Ezra",
        "Nehemiah",
        "Esther",
        "Job",
        "Psalms",
        "Proverbs",
        "Ecclesiastes",
        "Song of Solomon",
        "Isaiah",
        "Jeremiah",
        "Lamentations",
        "Ezekiel",
        "Daniel",
        "Hosea",
        "Joel",
        "Amos",
        "Obadiah",
        "Jonah",
        "Micah",
        "Nahum",
        "Habakkuk",
        "Zephaniah",
        "Haggai",
        "Zechariah",
        "Malachi",
        "Matthew",
        "Mark",
        "Luke",
        "John",
        "Acts",
        "Romans",
        "1 Corinthians",
        "2 Corinthians",
        "Galatians",
        "Ephesians",
        "Philippians",
        "Colossians",
        "1 Thessalonians",
        "2 Thessalonians",
        "1 Timothy",
        "2 Timothy",
        "Titus",
        "Philemon",
        "Hebrews",
        "James",
        "1 Peter",
        "2 Peter",
        "1 John",
        "2 John",
        "3 John",
        "Jude",
        "Revelation",
      ];

      const filterdBooks = allBooks.filter((book) =>
        canonicalBooks.includes(book.name)
      );

      for (const book of filterdBooks) {
        const li = document.createElement("li");
        li.classList.add("book-item");

        const toggleBtn = document.createElement("button");
        toggleBtn.classList.add("book-toggle");
        toggleBtn.textContent = book.name;

        const chaptersDiv = document.createElement("div");
        chaptersDiv.classList.add("chapters");

        this.getChapters(book.id, chaptersDiv);

        li.appendChild(toggleBtn);
        li.appendChild(chaptersDiv);
        document.getElementById("bookList").appendChild(li);

        toggleBtn.addEventListener("click", () => {
          chaptersDiv.classList.toggle("active");
        });
      }
    });
  }

  getChapters(bookId, chaptersDiv) {
    const callApi = new BibleApi(
      `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/books/${bookId}/chapters`
    );
    callApi.getApi().then((res) => {
      const data = res.data;

      for (const chapter of data) {
        const chapterBtn = document.createElement("button");
        chapterBtn.classList.add("chapter-btn");
        chapterBtn.textContent = chapter.reference;
        chapterBtn.addEventListener("click", () => {
          this.getVerses(chapter.id);
        });
        chaptersDiv.appendChild(chapterBtn);
      }
    });
  }

  getVerses(chapterId) {
    const callApi = new BibleApi(
      `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/chapters/${chapterId}`
    );

    callApi.getApi().then((res) => {
      const chapter = res.data;

      document.getElementById("displayArea").innerHTML = "";

      const h3 = document.createElement("h3");
      h3.textContent = chapter.reference;

      const p = document.createElement("p");
      p.innerHTML = chapter.content;

      p.classList.add("verse");
      document.getElementById("displayArea").appendChild(h3);
      document.getElementById("displayArea").appendChild(p);
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

// class for toggling between old and new testament books
class FilterOldAnNewTestament {
  constructor() {
    this.oldTestamentBooks = [
      "Genesis",
      "Exodus",
      "Leviticus",
      "Numbers",
      "Deuteronomy",
      "Joshua",
      "Judges",
      "Ruth",
      "1 Samuel",
      "2 Samuel",
      "1 Kings",
      "2 Kings",
      "1 Chronicles",
      "2 Chronicles",
      "Ezra",
      "Nehemiah",
      "Esther",
      "Job",
      "Psalms",
      "Proverbs",
      "Ecclesiastes",
      "Song of Solomon",
      "Isaiah",
      "Jeremiah",
      "Lamentations",
      "Ezekiel",
      "Daniel",
      "Hosea",
      "Joel",
      "Amos",
      "Obadiah",
      "Jonah",
      "Micah",
      "Nahum",
      "Habakkuk",
      "Zephaniah",
      "Haggai",
      "Zechariah",
      "Malachi",
    ];
    this.newTestamentBooks = [
      "Matthew",
      "Mark",
      "Luke",
      "John",
      "Acts",
      "Romans",
      "1 Corinthians",
      "2 Corinthians",
      "Galatians",
      "Ephesians",
      "Philippians",
      "Colossians",
      "1 Thessalonians",
      "2 Thessalonians",
      "1 Timothy",
      "2 Timothy",
      "Titus",
      "Philemon",
      "Hebrews",
      "James",
      "1 Peter",
      "2 Peter",
      "1 John",
      "2 John",
      "3 John",
      "Jude",
      "Revelation",
    ];
  }

  displayOldTestament() {
    const getAllBooks = document.querySelectorAll(".book-toggle");

    for (const book of getAllBooks) {
      const bookName = book.textContent.trim();

      if (this.oldTestamentBooks.includes(bookName)) {
        book.parentElement.style.display = "block";
      } else {
        book.parentElement.style.display = "none";
      }
    }
  }
  displayNewTestament() {
    const getAllBooks = document.querySelectorAll(".book-toggle");

    for (const book of getAllBooks) {
      const bookName = book.textContent.trim();

      if (this.newTestamentBooks.includes(bookName)) {
        book.parentElement.style.display = "block";
      } else {
        book.parentElement.style.display = "none";
      }
    }
  }
}

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

// adding click event for search
searchBtn.addEventListener("click", () => {
  const searchVerse = new SearchQuotation(
    `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/search?query=${searchInput.value}`
  );
  searchVerse.search();

  searchInput.value = "";
});

// create an instance of the filterOldAndNewtestamet
const filterBooks = new FilterOldAnNewTestament();

// access the DOM element of the toggle button of old and new testament
const oldTestamentBtn = document.getElementById("oldTestamentBtn");
const newTestamentBtn = document.getElementById("newTestamentBtn");

// create event listeners for both of them
oldTestamentBtn.addEventListener("click", () =>
  filterBooks.displayOldTestament()
);
newTestamentBtn.addEventListener("click", () =>
  filterBooks.displayNewTestament()
);
