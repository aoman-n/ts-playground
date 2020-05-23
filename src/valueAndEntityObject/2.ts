class BaseError extends Error {
  constructor(e?: string) {
    super(e)
    this.name = new.target.name
  }
}

class ArgumentNullError extends BaseError {}

interface IEqualable {
  Equal(other: any): boolean
}

// 値オブジェクト
class UserName {
  readonly value: string

  constructor(value: string) {
    if (value === '') throw new ArgumentNullError("value is null")
    if (value.length < 3) throw new RangeError("more than 3 characters")

    this.value = value
  }
}

class UserId {
  readonly value: string

  constructor() {
    this.value = this.getUniqueStr()
  }

  getUniqueStr(myStrong?: number){
    let strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
  }
}

// エンティティオブジェクト
class User implements IEqualable {
  private readonly id: UserId
  private name: string

  constructor(obj: { name: string, id: UserId } ) {
    if (obj.id === undefined) throw new ArgumentNullError("id is required")
    if (obj.name === '' ) throw new ArgumentNullError("name is required")

    this.name = obj.name
    this.id = obj.id
  }

  changeName(name: string) {
    if (name === '') throw new ArgumentNullError("value is null")
    if (name.length < 3) throw new RangeError("more than 3 characters")

    this.name = name
  }

  Equal(other: User): boolean {
    if (other === this) return true
    return other.id.value === this.id.value
  }
}

const user1 = new User({ name: 'hogekun', id: new UserId() })
const user2 = new User({ name: 'hogekun', id: new UserId() })

console.log('user1 と user1 の比較', user1.Equal(user1))
console.log('user1 と user2 の比較', user1.Equal(user2))


export {}