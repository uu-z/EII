import Eii from '../dist/lib'

describe('get file', () => {
  it('should run success', async () => {
    const test = new Eii({input: '/Users/vai/input.mkv', outDir:`${process.cwd()}/example`, startSec: 500, time: 10, thread: 4})

    test.start()
  })
})
