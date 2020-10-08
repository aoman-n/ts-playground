abstract class AbstractDisplay {
  protected abstract open(): void
  protected abstract print(): void
  protected abstract close(): void
  display() {
    this.open()
    for (let i = 0; i < 5; i++) {
      this.print()
    }
    this.close()
  }
}

class CharDisplay extends AbstractDisplay {
  private str: string

  constructor(str: string) {
    super()
    this.str = str
  }

  open() {
    console.log('--------------')
  }

  print() {
    console.log(this.str)
  }

  close() {
    console.log('---------------')
  }
}

class StringDisplay extends AbstractDisplay {
  private str: string
  private width: number

  constructor(str: string) {
    super()
    this.str = str
    this.width = encodeURIComponent(str).replace(/%../g,"x").length
  }

  printLine() {
    console.log(`+${'-'.repeat(this.width)}+`)
  }

  open() {
    this.printLine()
  }

  print() {
    console.log(`|${this.str}|`)
  }

  close() {
    this.printLine()
  }
}

const d1: AbstractDisplay = new CharDisplay('HHH')
const d2: AbstractDisplay = new StringDisplay('Hello, World')
const d3: AbstractDisplay = new StringDisplay('Okok')

d1.display()
d2.display()
d3.display()
