import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: 'income' | 'outcome';
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
    // TODO
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
