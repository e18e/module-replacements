---
description: Modern alternative to the fftjs and fft-js packages for computing Fast Fourier Transforms
---

# Replacements for `fftjs` and `fft-js`

**Motivation:** `fftjs` and `fft-js` are unmaintained and pull in unneeded dependencies, while `fft.js` is faster and has none.

## `fft.js`

[`fft.js`](https://github.com/indutny/fft.js) is a dependency-free radix-4 FFT. Instead of returning new objects, it writes into preallocated arrays where complex numbers are interleaved as `[re0, im0, re1, im1, ...]`. The size must be a power of 2 greater than 1.

`fftjs` example:

<!-- prettier-ignore -->
```js
import fftjs from 'fftjs' // [!code --]
import FFT from 'fft.js' // [!code ++]

const signal = [1, 1, 1, 1, 0, 0, 0, 0]

const { real, imag } = fftjs.fft(signal) // [!code --]
const f = new FFT(signal.length) // [!code ++]
const out = f.createComplexArray() // [!code ++]
f.realTransform(out, signal) // [!code ++]
f.completeSpectrum(out) // [!code ++]
const real = out.filter((_, i) => i % 2 === 0) // [!code ++]
const imag = out.filter((_, i) => i % 2 === 1) // [!code ++]

const reconstructed = fftjs.ifft({ real, imag }).real // [!code --]
const data = f.createComplexArray() // [!code ++]
f.inverseTransform(data, out) // [!code ++]
const reconstructed = data.filter((_, i) => i % 2 === 0) // [!code ++]
```

`fft-js` example:

<!-- prettier-ignore -->
```js
import fftJs from 'fft-js' // [!code --]
import FFT from 'fft.js' // [!code ++]

const signal = [1, 1, 1, 1, 0, 0, 0, 0]

const phasors = fftJs.fft(signal) // [[re, im], ...] // [!code --]
const f = new FFT(signal.length) // [!code ++]
const out = f.createComplexArray() // [!code ++]
f.realTransform(out, signal) // [!code ++]
f.completeSpectrum(out) // [!code ++]
const phasors = Array.from({ length: f.size }, (_, i) => [out[2 * i], out[2 * i + 1]]) // [!code ++]

const reconstructed = fftJs.ifft(phasors).map(([re]) => re) // [!code --]
const data = f.createComplexArray() // [!code ++]
f.inverseTransform(data, out) // [!code ++]
const reconstructed = data.filter((_, i) => i % 2 === 0) // [!code ++]
```
