

## ES7 特性

1、Array.prototype.includes

    let arr = ['react', 'angular', 'vue']

    // Correct
    if (arr.includes('vue')) { // true
      console.log('this is vue demo')
    }

    let str = 'React Quickly'

    // Correct
    if (str.toLowerCase().includes('react')) {  // true
      console.log('Found "react"')  
    }

相当于

    jQuery: $.inArray
    Underscore.js: _.contains


2、Exponentiation Operator(求幂运算

    let a = 7 ** 12
    let b = 2 ** 7
    console.log(a === Math.pow(7,12)) // true
    console.log(b === Math.pow(2,7)) // true
    
 
## ES8 特性

