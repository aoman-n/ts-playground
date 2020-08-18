// 必要なintefaceの定義

interface IAggreage<T> {
  iterator(): IIterator<T>
}

interface IIterator<T> {
  hasNext(): boolean
  next(): T
}

class Book {
  private name: string

  constructor(name: string) {
    this.name = name
  }

  getName(): string {
    return this.name
  }
}

// Bookの集約クラス
class BookShelf implements IAggreage<Book> {
  private books: Book[]
  private last: number

  constructor() {
    this.books = []
    this.last = 0
  }

  iterator(): BookShelfIterator {
    return new BookShelfIterator(this)
  }

  appendBook(book: Book) {
    this.books.push(book)
    this.last++
  }

  getLength() {
    return this.books.length
  }

  getBookAt(index: number): Book {
    return this.books[index]
  }
}

// BookShelfの集約クラス
class BookShelfIterator implements IIterator<Book> {
  private bookShelf: BookShelf
  private index: number

  constructor(bookShelf: BookShelf) {
    this.bookShelf = bookShelf
    this.index = 0
  }

  // 次にnextを呼び出して大丈夫かどうか確認するメソッド
  hasNext() {
    if (this.index < this.bookShelf.getLength()) {
      return true
    }

    return false
  }

  // 現在のindexのbookを返して一つすすめる
  next(): Book {
    const book = this.bookShelf.getBookAt(this.index)
    this.index++
    return book
  }
}

const book1 = new Book('smaple book1')
const book2 = new Book('smaple book2')
const book3 = new Book('smaple book3')
const book4 = new Book('smaple book4')
const bookShelf = new BookShelf()
bookShelf.appendBook(book1)
bookShelf.appendBook(book2)
bookShelf.appendBook(book3)
bookShelf.appendBook(book4)
const bookShelfIterator = bookShelf.iterator()

while (bookShelfIterator.hasNext()) {
  const book = bookShelfIterator.next()
  console.log('bookName: ', book.getName())
}