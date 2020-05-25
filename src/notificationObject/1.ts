/*
  通知オブジェクトとは...
  オブジェクトの内部データを外部に非公開にしたまま、
  内部データを引き渡すことが出来るオブジェクト
*/

// 通知オブジェクトに実装する必要のあるインターフェース
interface IUserNotification {
  setId: (id: number) => void
  setName: (name: string) => void
}

// 外部に取り出し利用するためのUserDataModel型
interface UserDataModel {
  id: number
  name: string
}

// 通知オブジェクト
class UserDataModelBuilder implements IUserNotification {
  private id: number
  private name: string

  constructor() {
    this.id = 0
    this.name = ''
  }

  setId(id: number) {
    this.id = id
  }

  setName(name: string) {
    this.name = name
  }

  build(): UserDataModel {
    if (this.id === 0 || this.name === '') {
      new Error("idまたはnameがセットされていません")
    }

    return {
      id: this.id,
      name: this.name,
    }
  }
}

// プライベートなid,nameを持つUserクラス
// notifyメソッド内で通知オブジェクトに値を受け渡す
class User {
  // idとnameはプライベート変数なので外からはアクセス出来ない
  private id: number
  private name: string

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }

  notify(note: IUserNotification) {
    note.setId(this.id)
    note.setName(this.name)
  }
}

// ユーザーのインスタンス作成。
// 中の情報を外部で使用したいが公開されていない
const user = new User(1, 'takashi')
const userDataModelBuilder = new UserDataModelBuilder()
user.notify(userDataModelBuilder)
const data = userDataModelBuilder.build()
console.log({ data }) // UserDataModelとしてデータを取り出し利用出来る

export {}
