class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

class FullName {
  firstName?: string;
  lastName?: string;

  // 参考: https://qiita.com/Tsuyoshi84/items/e74109e2ccc0f4e625aa
  constructor(init: Partial<FullName>) {
    Object.assign(this, init);
  }

  Equal(other: FullName) {
    return this.firstName === other.firstName &&
      this.lastName === other.lastName
  }
}

const fullName1 = new FullName({ firstName: 'hoge', lastName: 'huga' });
const fullName2 = new FullName({ firstName: 'hoge', lastName: 'huga' });
console.log(fullName1.Equal(fullName2));

export {};