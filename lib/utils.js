import { execSync } from 'child_process'
import fs from 'fs'

export const getfileName = (filename) => {
    return filename.split('/').pop().split('.').shift()
}

export const getFileInfo = (file) => {
    let buf = execSync(`ffprobe -v quiet -print_format json -show_format -show_streams ${file}`)
    return JSON.parse(buf)
}

export const checkDirExists = (dir) => {
    try {
        fs.statSync(dir)
    } catch (e) {
        fs.mkdirSync(dir)
    }
}