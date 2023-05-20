import {SlashCommand} from '../types'
import {Answer} from './Answer'
import {Init} from './Init'
import {Ping} from './Ping'
import {Reset} from './Reset'
export const commands : SlashCommand[] = [
  Answer,
  Init,
  Ping,
  Reset,
]
