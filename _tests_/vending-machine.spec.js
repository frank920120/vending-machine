const vendingMachineStats = require("../src/vending-machine");
const fs = require("fs");

describe("vendingMachine", () => {
  let vendingMachine;

  beforeEach(() => {
    vendingMachine = {};
    vendingMachine.data = JSON.parse(
      fs.readFileSync("./vendingMachineData.json").toString()
    );
    vendingMachine.subject = new vendingMachineStats(
      vendingMachine.data.products,
      vendingMachine.data.initialCoins
    );
    vendingMachine.productsData = vendingMachine.subject.products;
    vendingMachine.coinsData = vendingMachine.subject.initialCoins;
  });

  describe("printInventory()", () => {
    //01
    describe("when the user uses vendingMachine", () => {
      it("should return all the vendingMachine items", () => {
        expect(vendingMachine.subject.printInventory()).toEqual(
          vendingMachine.productsData
        );
      });
    });
  });
  //02
  describe("refillInventory()", () => {
    describe("when the inventory needs to be refilled", () => {
      it("should return all the products with maxiumn quantity", () => {
        expect(vendingMachine.subject.refillInventory()).toEqual([
          { id: 1, name: "LV", cost: 2, quantity: 15 },
          { id: 2, name: "Gucci", cost: 1, quantity: 15 },
          { id: 3, name: "Prada", cost: 2.25, quantity: 15 },
          { id: 4, name: "Chanel", cost: 4.75, quantity: 15 }
        ]);
      });
    });
  });
  //03
  describe("refillOneItem(item)", () => {
    describe("when one of the items in the inventory needs to be refilled", () => {
      it("should return all the products with the item that has been refilled", () => {
        expect(vendingMachine.subject.refillOneItem("Chanel")).toEqual([
          { id: 1, name: "LV", cost: 2, quantity: 14 },
          { id: 2, name: "Gucci", cost: 1, quantity: 11 },
          { id: 3, name: "Prada", cost: 2.25, quantity: 15 },
          { id: 4, name: "Chanel", cost: 4.75, quantity: 15 }
        ]);
      });
    });
  });
  //04
  describe("resupplyChange()", () => {
    describe("when the change is resupplied", () => {
      it("should return all the money with maxiumn quantity", () => {
        expect(vendingMachine.subject.resupplyChange()).toEqual([
          { name: "quarter", price: 0.25, quantity: 100 },
          { name: "dime", price: 0.1, quantity: 100 },
          { name: "nickel", price: 0.05, quantity: 100 },
          { name: "loonie", price: 1, quantity: 100 },
          { name: "toonie", price: 2, quantity: 100 }
        ]);
      });
    });
  });
  describe("resupplyOneChange(coinType)", () => {
    describe("when one of the change type needs to be resupplied", () => {
      it("should return all the money with that changetype of maxiumn quantity", () => {
        expect(vendingMachine.subject.resupplyOneChange("quarter")).toEqual([
          { name: "quarter", price: 0.25, quantity: 100 },
          { name: "dime", price: 0.1, quantity: 35 },
          { name: "nickel", price: 0.05, quantity: 40 },
          { name: "loonie", price: 1, quantity: 45 },
          { name: "toonie", price: 2, quantity: 50 }
        ]);
      });
    });
  });

  describe("DispenseInventory(payment,item)", () => {
    //05
    describe("when user choose the item that is out of stock", () => {
      it("should throw an error", () => {
        expect(() =>
          vendingMachine.subject.DispenseInventory(5, "Chanel")
        ).toThrow("out of stock");
      });
    });
    //06
    describe("when user choose the item that does not exist", () => {
      it("should throw an error", () => {
        expect(() =>
          vendingMachine.subject.DispenseInventory(5, "hello")
        ).toThrow("item does not exist");
      });
    });
    //07
    describe("when user insert the money that is less than the item price", () => {
      it("should throw an error", () => {
        expect(() =>
          vendingMachine.subject.DispenseInventory(1, "Prada")
        ).toThrow("insufficient payment");
      });
    });

    //08
    describe("when user insert the correct payment", () => {
      it("should return the item with new quantity", () => {
        expect(vendingMachine.subject.DispenseInventory(2, "Gucci")).toEqual([
          { id: 1, name: "LV", cost: 2, quantity: 14 },
          { id: 2, name: "Gucci", cost: 1, quantity: 10 },
          { id: 3, name: "Prada", cost: 2.25, quantity: 15 },
          { id: 4, name: "Chanel", cost: 4.75, quantity: 0 }
        ]);
      });
    });
  });
  //09
  describe("returnChanges(payment,item)", () => {
    describe("when user finishes the payment", () => {
      it("should return the total change", () => {
        expect(vendingMachine.subject.returnChanges(10, "Prada")).toEqual([
          { name: "quarter", price: 0.25, quantity: 27 },
          { name: "dime", price: 0.1, quantity: 35 },
          { name: "nickel", price: 0.05, quantity: 40 },
          { name: "loonie", price: 1, quantity: 44 },
          { name: "toonie", price: 2, quantity: 47 }
        ]);
      });
    });
  });
});
