/**
 * Adaptee(適合される側)の役 - 既に実装されているクラス
 */
class Banner {
  private str: string

  constructor(str: string) {
    this.str = str
  }

  showWithParen() {
    console.log(`(${this.str})`)
  }

  showWithAster() {
    console.log(`*${this.str}*`)
  }
}

/**
 * 継承によるアダプター
 */

// Target(対象)の役
interface Print {
  printWeak(): void
  printStrong(): void
}

// Adapterの役
class PrintBanner extends Banner implements Print {
  constructor(str: string) {
    super(str)
  }

  printWeak() {
    this.showWithParen()
  }

  printStrong() {
    this.showWithAster()
  }
}

// Client(依頼者)の役
const main1 = () => {
  const print: Print = new PrintBanner('hello')
  print.printStrong()
  print.printWeak()
}

main1()


/**
 * 委譲によるアダプター
 */

// Targetの役
abstract class Print2 {
  abstract printWeak(): void
  abstract printStrong(): void
}

// Adapterの役
class PrintBanner2 extends Print2 {
  private banner: Banner

  constructor(str: string) {
    super()
    this.banner = new Banner(str)
  }

  printWeak() {
    this.banner.showWithParen()
  }

  printStrong() {
    this.banner.showWithAster()
  }
}

// Clientの役
const main2 = () => {
  const print: Print2 = new PrintBanner2('hello')
  print.printStrong()
  print.printWeak()
}

main2()
