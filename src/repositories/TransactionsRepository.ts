import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface ReceiptDTO {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];
  private balance: Balance;
  private receipt: ReceiptDTO;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
    this.receipt = { transactions: this.all(), balance: this.getBalance() };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO ): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    if(type === "income") {
      this.balance.income += value;
    } else {
      this.balance.outcome += value;
    }
    this.balance.total = this.balance.income - this.balance.outcome;
    return transaction;
  }

  public getReceipt(): ReceiptDTO {
    return this.receipt;
  }

}

export default TransactionsRepository;