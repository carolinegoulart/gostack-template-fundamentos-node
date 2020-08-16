import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: RequestDTO): Transaction {

    const balance = this.transactionsRepository.getBalance().total;

    if(type === "outcome" && balance < value) {
      throw Error('Sorry, there is not enough funds on you account.');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });
    
    return transaction;  

  }
}

export default CreateTransactionService;
