import eii from 'eii'

describe('get file', () => {
  it('should run success', async () => {
    const test = new eii({input: '/Users/vai/input.mkv', outDir:`${process.cwd()}/example`, startSec: 628})

    test.start()

  })
})
