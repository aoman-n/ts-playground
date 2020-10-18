import readline from 'readline'

// 状態の管理、警備センターへの呼び出しを行う
interface Context {
  setClock(hour: number): void
  changeState(state: State): void
  callSecurityCenter(msg: string): void
  recordLog(msg: string): void
}

// 状態を司る、状態毎にこのインターフェースを実装した具象クラスを定義
interface State {
  doClock(context: Context, hour: number): void
  doAlerm(context: Context): void
  doUse(context: Context): void
  doPhone(context: Context): void
}

const operations = {
  '1': '金庫を使う',
  '2': '非常ベルを鳴らす',
  '3': '警備センターに電話をかける',
  '4': '終了',
} as const

class SafeFrame implements Context {
  private state: State
  private operations: typeof operations
  private hour: number

  constructor() {
    this.state = DayState.getInstance()
    this.operations = operations
    this.hour = 0
  }

  private joinValues<T extends { [key: string]: string }>(obj: T) {
    let msg: string = ''
    for (const key in obj) {
      msg += key + ': ' + obj[key] + '\n'
    }
    return msg
  }

  displayOperationList(): string {
    return this.joinValues(this.operations)
  }

  inputCommand(command: string) {
    switch (command) {
    case '1':
      this.state.doUse(this)
      break
    case '2':
      this.state.doAlerm(this)
      break
    case '3':
      this.state.doPhone(this)
      break
    case '4':
      console.log('bye!')
      process.exit(0)
    default:
      console.log('存在しないコマンドが入力されました。')
    }
  }

  setClock(hour: number) {
    this.hour = hour
    this.state.doClock(this, hour)
  }

  changeState(state: State) {
    this.state = state
  }

  callSecurityCenter(msg: string) {
    console.log('[call] ' + msg + this.getTime())
  }

  recordLog(msg: string) {
    console.log('[record] ' + msg + this.getTime())
  }

  private getTime(): string {
    let clockString = ' - 現在時刻: '
    if (this.hour < 10) {
      clockString += '0' + this.hour + ':00'
    } else {
      clockString += this.hour + ':00'
    }
    return clockString
  }
}

class DayState implements State {
  static instance: DayState

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new DayState()
    }
    return this.instance
  }

  doClock(context: Context, hour: number) {
    if (hour < 9 || 21 < hour) {
      context.changeState(NightState.getInstance())
    }
  }

  doAlerm(context: Context) {
    context.callSecurityCenter('非常ベル(昼間)')
  }

  doUse(context: Context) {
    context.recordLog('金庫を使用しました(昼間)')
  }

  doPhone(context: Context) {
    context.callSecurityCenter('通常通話(昼間)')
  }

  toString() {
    return '[昼間]'
  }
}

class NightState implements State {
  static instance: NightState

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new NightState()
    }
    return this.instance
  }

  doClock(context: Context, hour: number) {
    if (9 < hour && hour < 21) {
      context.changeState(DayState.getInstance())
    }
  }

  doAlerm(context: Context) {
    context.callSecurityCenter('非常ベル(夜間)')
  }

  doUse(context: Context) {
    context.recordLog('金庫を使用しました(夜間)')
  }

  doPhone(context: Context) {
    context.recordLog('夜間の通話録音')
  }

  toString() {
    return '夜間'
  }
}

const main = () => {
  const safeFrame = new SafeFrame()

  // 入力を待ち受ける処理
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const waitingText = '> '

  rl.on('line', line => {
    safeFrame.inputCommand(line)
    console.log(waitingText)
  })

  rl.on('close', () => {
    console.log('exit!')
  })

  process.stdout.write(safeFrame.displayOperationList())
  process.stdout.write(waitingText)

  let hour: number = 0
  setInterval(() => {
    safeFrame.setClock(hour)
    if (hour > 24) {
      hour = 0
    } else {
      hour++
    }
  }, 1000)
}

main()
