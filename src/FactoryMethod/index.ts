/* フレームワークの抽象クラス */
abstract class Factory {
  create(owner: string): Product {
    const newProduct = this.createProduct(owner)
    this.registerProduct(newProduct)
    return newProduct
  }

  abstract createProduct(owner: string): Product
  abstract registerProduct(product: Product): void
}

/* フレームワークの抽象クラス */
abstract class Product {
  abstract use(): void
}

/* 具象クラス */
class IDCardFactory extends Factory {
  private idcards: IDCard[]

  constructor() {
    super()
    this.idcards = []
  }

  createProduct(owner: string): IDCard {
    return new IDCard(owner)
  }

  registerProduct(idcard: IDCard): void {
    this.idcards = this.idcards.concat(idcard)
  }

  getOwners(): string[] {
    return this.idcards.map(idcard => idcard.getOwner())
  }
}

/* 具象クラス */
class IDCard extends Product {
  private owner: string

  constructor(owner: string) {
    super()
    this.owner = owner
  }

  use() {
    console.log(`${this.owner}がIDCardを使用します!!`)
  }

  getOwner(): string {
    return this.owner
  }
}

const main = () => {
  const factory = new IDCardFactory()
  const card1 = factory.create('花子')
  const card2 = factory.create('太郎')
  const card3 = factory.create('次郎')

  card1.use()
  card2.use()
  card3.use()

  const owners = factory.getOwners()
  console.log({ owners })

}

main()
