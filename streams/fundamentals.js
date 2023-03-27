// Stremas ->

//process.stdin //stream de entrada
//.pipe(process.stdout) //stream de saída

import { Readable, Writable } from 'node:stream'

class OneToHundredStream extends Readable{
    index = 1
    _read() {
        const i = this.index++
       setTimeout(() => {
        if(i > 100){
            this.push(null)
        } else {
            const buf = Buffer.from(String(i))
            this.push(buf)
        }
       }, 1000)
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) { //chunk é cada pedaço da stream, encoding é como a informação está codificada
        console.log(Number(chunk.toString()) *10)
        callback()
    } 
}

new OneToHundredStream()
.pipe(new MultiplyByTenStream)