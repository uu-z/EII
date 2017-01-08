import Eii from '../dist/lib'

describe('get file', () => {
  it('should run success', async () => {
    const test = new Eii({input: '/Users/vai/input.mkv', outDir:`${process.cwd()}/example`, time: 5})

    test.start()

  })
})
