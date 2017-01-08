import eii from 'eii'

describe('get file', () => {
  it('should run success', async () => {
    const test = new eii({input: '/Users/vai/input.mkv', outDir:`${process.cwd()}/example`, startSec: 638, time: 5})

    test.start()

  })
})
