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
  refillOneItem(item) {
    const currentItem = this.products.map(product => {
      if (product.name === item) {
        return { ...product, quantity: this.maxQuantity };
      }
      return product;
    });

    return currentItem;
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
  resupplyOneChange(coinType) {
    const resuppliedOneChange = this.initialCoins.map(coin => {
      if (coin.name === coinType) {
        return { ...coin, quantity: this.maxChangeQuantity };
      }
      return coin;
    });
    console.log(resuppliedOneChange);
    return resuppliedOneChange;
  }

  DispenseInventory(payment, item) {
    const findItem = this.products.find(product => product.name === item);
    if (!findItem) throw Error("item does not exist");
    if (findItem.quantity === 0) throw Error("out of stock");
    if (findItem.cost > payment) throw Error("insufficient payment");

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

    return newQuantityProduct;
  }
  returnChanges(payment, item) {
    let quarterCount = 0;
    let dimeCount = 0;
    let nickelCount = 0;
    let loonieCount = 0;
    let toonieCount = 0;
    const findItem = this.products.find(product => product.name === item);
    const change = payment - findItem.cost;
    const int = Math.floor(change);
    const float = change % int;
    if (int % 2 == 0) {
      toonieCount = int / 2;
    }
    if (int % 2 != 0) {
      loonieCount = 1;
      toonieCount = (int - 1) / 2;
    }
    if (float > 0.25) {
      quarterCount = Math.floor(float / 0.25);
      let quaterReminder = float % 0.25;
      if (quaterReminder >= 0.1) {
        dimeCount = Math.floor(float / 0.1);
        let dimeReminder = float % 0.1;
        if (dimeReminder >= 0.05) {
          nickelCount = Math.floor(float / 0.05);
        }
      }
    }
    if (float < 0.25) {
      dimeCount = Math.floor(float / 0.1);
      let dimeReminder = float % 0.1;
      if (dimeReminder >= 0.05) {
        nickelCount = Math.floor(float / 0.05);
      }
    }
    if (float < 0.1) {
      nickelCount = Math.floor(float / 0.05);
    }

    const coins = this.initialCoins.map(coin => {
      if (coin.name === "quarter") {
        return {
          ...coin,
          quantity: coin.quantity - quarterCount
        };
      }
      if (coin.name === "dime") {
        return {
          ...coin,
          quantity: coin.quantity - dimeCount
        };
      }
      if (coin.name === "nickel") {
        return {
          ...coin,
          quantity: coin.quantity - nickelCount
        };
      }
      if (coin.name === "loonie") {
        return {
          ...coin,
          quantity: coin.quantity - loonieCount
        };
      }
      if (coin.name === "toonie") {
        return {
          ...coin,
          quantity: coin.quantity - toonieCount
        };
      }
    });
    console.log({
      nickelCount,
      dimeCount,
      quarterCount,
      loonieCount,
      toonieCount,
      totalChange: change
    });
    return coins;
  }
}

module.exports = vendingMachineStats;
