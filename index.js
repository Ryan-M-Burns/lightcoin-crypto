class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    this.time = new Date();

    if (!this.isAllowed()) {
      return console.log("Your account balaance is insufficient. Withdrawal cancelled.");
    }

    this.account.addTransaction(this);
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((sum, value) => {
      return sum + value.value;
    }, 0);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");


t1 = new Withdrawal(50.25, myAccount);
t1.commit();

//console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();

//console.log('Transaction 2:', t2);

t3 = new Deposit(120.00, myAccount);
t3.commit();

// console.log('Transaction 3:', t3);
// console.log(myAccount.transactions);
console.log('Ending Balance:', myAccount.balance);
