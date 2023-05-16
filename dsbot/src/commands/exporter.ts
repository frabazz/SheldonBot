import {SlashCommand} from '../types'
import {Bing} from './Bing'
import {Init} from './Init'
import {Ping} from './Ping'
export const commands : SlashCommand[] = [
  Bing,
  Init,
  Ping,
]
