/* @flow */

import { exec } from 'child_process'
import { getfileName, getFileInfo, checkDirExists } from './utils'


type ProbeInfo = {
    streams: Array<Object>,
    format: Object,
}

export default class EII {
    taskQueue : Array<number>;
    completeQueue: Array<number>;
    options: Object;
    fileinfo: ProbeInfo;
    format: Object;
    video: Object;

    constructor(
        options: Object,
    ) {
        this.taskQueue = []
        this.completeQueue = []

        if(options) {
            
            this.options = options
            this.fileinfo = getFileInfo(options.input)
            this.video = this.fileinfo.streams[1]
            this.format = this.fileinfo.format
        }
    }

    start(): void {

        const {startSec = 0, time = 10, outDir } = this.options
        outDir && checkDirExists(outDir)
        
        let i = startSec
        do {
            this.taskQueue.push(i)
            i += time
        } while (i < this.format.duration)

        this.extracter()
    }



    extracter(): void {
        const {input, time= 10, fps= 10, outDir= process.cwd()} = this.options
        const filename = getfileName(this.options.input)
        const height = this.options.height || this.video.height 
        let current = this.taskQueue[0]
        
        new Promise((resolve, reject) => {


            exec(`ffmpeg -i ${input} -vf scale=${height}:-1 -ss ${current} -t ${time} -r ${fps} -y ${outDir}/${filename}${current}.gif `, (err, stdout, stderr) => {
                if (err) {
                    this.taskQueue.unshift(current)
                    reject(err)
                }
                if (stderr) {
                    this.completeQueue.push(current)
                    console.log(`耗时${process.uptime()}s, 已完成: ${this.completeQueue.length}, 还剩余: ${this.taskQueue.length}`)
                    if (this.taskQueue.length > 0) {
                        resolve(this.extracter())
                    }
                }
            })
            this.taskQueue.shift()
        })
    }
}