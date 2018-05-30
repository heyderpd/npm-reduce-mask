# REDUCE MAKS

Simple and light mask in react, can use mult mask for same input.

This mask don't break your cursor, will re position the cursosr to relative final position.

* Work in Mobile, Safari, Mozila etc.
* Re position text cursor to relative position.
* Return evt with masked and unmasked value.
* Accept multiple masks, use the mask best fits for the value.
* Will update if change [mask, defaultValue, onChange]

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

const onChange = evt => {
  const { value, maskedValue } = evt.target
  /*
    value = '12345678912'
    maskedValue = '123.456.789-12'

    do your this.setState(evt)
  */
}

<ReduceMask
  name='cpf/cnpj'
  mask={['___.___.___-__', '__.___.___/____-__']}
  placeholder='Ex: 123.456.789-12'
  defaultValue='12345678912'
  onChange={onChange}
/>
```

Example:
```javascript
<ReduceMask
  name='phone'
  mask='(__) ____-_____'
  placeholder='Ex: (99) 1234-5678'
  defaultValue='9912345678'
  onChange={onChange}
/>

<ReduceMask
  name='cpf'
  mask='___.___.___-__'
  placeholder='Ex: 123.456.789-12'
  onChange={onChange}
/>

<ReduceMask
  name='cnpj'
  mask='__.___.___/____-__'
  placeholder='Ex: 12.456.789/1234-56'
  onChange={onChange}
/>
```
