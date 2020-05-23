interface Comparator {
  compare: (user1: User, user2: User) => number
}

class User {
  age: number
  height: number
  weight: number

  constructor(obj: { age: number; height: number; weight: number }) {
    this.age = obj.age
    this.height = obj.height
    this.weight = obj.weight
  }
}

class AgeComparator implements Comparator {
  compare(user1: User, user2: User) {
    if (user1.age > user2.age) {
      return 1
    } else if (user1.age === user2.age) {
      return 0
    } else {
      return -1
    }
  }
}

class HeightComparator implements Comparator {
  compare(user1: User, user2: User) {
    if (user1.height > user2.height) {
      return 1
    } else if (user1.height === user2.height) {
      return 0
    } else {
      return -1
    }
  }
}

class WeightComparator implements Comparator {
  compare(user1: User, user2: User) {
    if (user1.weight > user2.weight) {
      return 1
    } else if (user1.weight === user2.weight) {
      return 0
    } else {
      return -1
    }
  }
}

class MyClass {
  private comparator: Comparator

  constructor(comparator: Comparator) {
    this.comparator = comparator
  }

  compare(user1: User, user2: User) {
    return this.comparator.compare(user1, user2)
  }
}

const user1 = new User({ age: 20, height: 175, weight: 70 })
const user2 = new User({ age: 40, height: 165, weight: 70 })

// ageを比較するMyClassインスタンス
const ageComparator = new AgeComparator()
const myClass1 = new MyClass(ageComparator)
// heightを比較するMyClassインスタンス
const heightComparator = new HeightComparator()
const myClass2 = new MyClass(heightComparator)
// weightを比較するMyClassインスタンス
const weightComparator = new WeightComparator()
const myClass3 = new MyClass(weightComparator)


/* compareを実行 */
console.log(myClass1.compare(user1, user2)) // -1
console.log(myClass2.compare(user1, user2)) // 1
console.log(myClass3.compare(user1, user2)) // 0

export {};