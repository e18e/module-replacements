---
description: Modern alternative to the fftjs and fft-js packages for computing Fast Fourier Transforms
---

# Replacements for `fftjs` and `fft-js`

**Motivation:** `fftjs` and `fft-js` are both unmaintained and have lighter, more modern alternatives.

## `fft.js`

[`fft.js`](https://github.com/indutny/fft.js) is a dependency-free radix-4 FFT. Instead of returning new objects, it writes into preallocated arrays where complex numbers are interleaved as `[re0, im0, re1, im1, ...]`.

Example:

<!-- prettier-ignore -->
```js
import fftjs from 'fftjs' // [!code --]
import FFT from 'fft.js' // [!code ++]

const signal = [1, 1, 1, 1, 0, 0, 0, 0]

const spectrum = fftjs.fft(signal) // { real: [...], imag: [...] } // [!code --]
const f = new FFT(signal.length) // [!code ++]
const spectrum = f.createComplexArray() // [!code ++]
f.realTransform(spectrum, signal) // [!code ++]
f.completeSpectrum(spectrum) // [re0, im0, re1, im1, ...] // [!code ++]

const reconstructed = fftjs.ifft(spectrum).real // [!code --]
const data = f.createComplexArray() // [!code ++]
f.inverseTransform(data, spectrum) // [!code ++]
const reconstructed = f.fromComplexArray(data) // [!code ++]
```
