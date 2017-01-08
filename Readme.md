# EII

EII use ffmpeg to convert video to gif, let us can easily intercept want pictures.

## Required

```bash
brew install ffmpeg

```

## Installation
```js

$ yarn add eii
```

## Usage

```js
import eii from 'eii'

const test = eii({input: 'foo/bar.mkv', outDir: 'foo/bar'})

test.start()

/*
耗时4.748s, 已完成: 1, 还剩余: 142
耗时9.33s, 已完成: 2, 还剩余: 141
耗时14.812s, 已完成: 3, 还剩余: 140
耗时21.59s, 已完成: 4, 还剩余: 139
...
*/

```

## Api

|field|default|required| desc |
|---|---|---|---| --- |
|input| | true | Video file address|
|outDir| current dir | |The output file directory |
|fps| 10 |  |frames per second |
|time| 10 | | Every how many seconds to extract|
|height|auto| | What do you want to output ratio, like: 720 1080 |
|startSec| 0 | | How many seconds from the beginning|


## Example


![preview](./example/input638.gif)


## license

MIT. Copyright (c) [viii](https://github.com/ncysatnaf).
