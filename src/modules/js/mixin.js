let mixin = {
    filters: {
        numPrice(price) {
            let indexFloat = `${price}`.split('').reverse().join('').indexOf('.');
            if (indexFloat === -1) {
                return price + '.00'
            } else if (indexFloat === 1) {
                return price + '0'
            } else if (indexFloat === 2) {
                return price
            }
        }
    }
   
}
export default mixin 