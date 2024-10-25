export class PaymentService {

    constructor() { }

    getTotalPaymentByMonth(tasks: any): number {
        console.log(tasks, 'Minhas tarefas')
        let totalPaymentByMonth = 0;

        tasks.forEach((task: any) => {
            
            totalPaymentByMonth += task.cost;
        });
        return totalPaymentByMonth;
    }

}