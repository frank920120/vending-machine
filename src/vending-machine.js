class vendingMachineStats {
  constructor(products, initialCoins) {
    this.products = products;
    this.initialCoins = initialCoins;
    this.maxQuantity = 15;
    this.maxChangeQuantity = 100;
    this.maxPayment = 5;
  }
  printInventory() {
    console.log(this.products);
    return this.products;
  }

  refillInventory() {
    const refilledInventory = this.products.map(product => {
      return {
        ...product,
        quantity: this.maxQuantity
      };
    });
    return refilledInventory;
  }
  resupplyChange() {
    const resuppliedChange = this.initialCoins.map(coin => {
      return {
        ...coin,
        quantity: this.maxChangeQuantity
      };
    });
    return resuppliedChange;
  }

  DispenseInventory(payment, item) {
    const findItem = this.products.find(product => product.name === item);
    if (findItem.quantity === 0) throw Error("out of stock");
    if (findItem.cost > payment) throw Error("insufficient payment");
    if (payment >= this.maxPayment)
      throw Error("only accepts the payment that is less equal than 5 dollars");
    let newQuantity = findItem.quantity - 1;
    const newQuantityProduct = this.products.map(product => {
      if (product.name === item) {
        return {
          ...product,
          quantity: newQuantity
        };
      }
      return product;
    });
    console.log(newQuantityProduct);
    return newQuantityProduct;
  }
  returnChanges(payment, item) {
    const findItem = this.products.find(product => product.name === item);
    const change = payment - findItem.cost;
    return change;
  }
}

module.exports = vendingMachineStats;
