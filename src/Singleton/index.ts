class Singleton {
  private static instance: Singleton

  private constructor() {
    // do something construct...
  }

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
    }

    return Singleton.instance
  }

  echo(str: string) {
    console.log(`${str}!!!!`)
  }
}

const obj1 = Singleton.getInstance()
const obj2 = Singleton.getInstance()

const isSame = obj1 === obj2
console.log({ isSame })

obj1.echo('Hello, World!')
obj2.echo('Thank you!')
