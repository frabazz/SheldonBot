import fs from 'fs'
import path from 'path'

class Writer {
    public filename: string
    public stream: fs.WriteStream
    constructor(filename: string) {
        this.filename = filename
        this.stream = fs.createWriteStream(filename)
    }

    writeLine(line: string, indent = 0, tabsize = 2) {
        let ris = ""
        for(let i = 0; i < indent; i++)
            for(let j = 0;j < tabsize;j++)
                ris+=' '
        ris += line
        ris += '\n';
        this.stream.write(ris)
    }

    write(str: string) {
        this.stream.write(str)
    }

    closeStream() {
        return new Promise<void>(
            (resolve, reject) => {
                try {
                    this.stream.on('finish', () => {
                        this.stream.close()
                        resolve()
                    })
                }catch(error){
                    reject(error)
                }
            }
        )
    }
}

async function genExportCommands() {
    /*
      NOTE: exporter.ts structure

      import {SlashCommand} from '../types'
      import {Command1} from './Command1'
      ........

      export const commands : SlashCommand[] = [
        Command1,
        ......
      ]
    */



    const files = fs.readdirSync(path.join(__dirname, './commands/'))
        .filter(elem => elem != 'exporter.ts')
        .map(elem => elem.replace('.ts', ''))

    const writer = new Writer(path.join(__dirname, './commands/exporter.ts'))
    writer.writeLine("import {SlashCommand} from '../types'")
    for(const file of files){
        writer.writeLine(`import {${file}} from './${file}'`)
    }
    writer.writeLine("export const commands : SlashCommand[] = [")
    for(const file of files){
        writer.writeLine(`${file},`, 1)
    }
    writer.writeLine("]")
    await writer.closeStream()
}

async function main(){
    console.log("generating command exports...")
    await genExportCommands()
}

main()
