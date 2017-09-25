# REDUCE MAKS
!! Works in mobile !!

Simple and light mask in react, can use mult mask for same input

## in the future:
Other formats than numbers

## I will help if you have any difficulty =)
Contact me by [github:heyderpd](https://github.com/heyderpd). I'll be glad to help you.

## Thanks for [npm~lucasmreis](https://www.npmjs.com/~lucasmreis)

* The mask accept only number in this version
* Mask accept any char, but '_' is a placeholder for the number

![ScreenShot](https://raw.githubusercontent.com/heyderpd/npm-reduce-mask/master/example.gif)
![ScreenShot](https://raw.githubusercontent.com/heyderpd/npm-reduce-mask/master/mult-mask.gif)

Example of Mult Mask:
```javascript
import ReduceMask from 'reduce-mask'

<ReduceMask
  name='mult-mask'
  mask={['___.___.___-__', '(__.___.___/____-__']}
  placeholder='Ex: (99) 1234-5678'
/>
```

Example:
```javascript
<ReduceMask
  name='phone'
  mask='(__) ____-_____'
  placeholder='Ex: (99) 1234-5678'
/>

<ReduceMask
  name='cpf'
  mask='___.___.___-__'
  placeholder='Ex: 123.456.789-12'
/>

<ReduceMask
  name='cnpj'
  mask='__.___.___/____-__'
  placeholder='Ex: 12.456.789/1234-56'
/>
```
