class vendingMachineStats {
  constructor(products, initialCoins) {
    this.products = products;
    this.initialCoins = initialCoins;
  }
  printInventory() {
    console.log(this.products);
    return this.products;
  }
}

module.exports = vendingMachineStats;
