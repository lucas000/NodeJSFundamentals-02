import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: string;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((incomeValue, transaction) => {
      return transaction.type === 'income'
        ? incomeValue + transaction.value
        : incomeValue;
    }, 0);

    const outcome = this.transactions.reduce((outcomeValue, transaction) => {
      return transaction.type === 'outcome'
        ? outcomeValue + transaction.value
        : outcomeValue;
    }, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction =
      type === 'income'
        ? new Transaction({ title, value, type: 'income' })
        : new Transaction({ title, value, type: 'outcome' });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
