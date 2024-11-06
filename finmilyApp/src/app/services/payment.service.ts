export class PaymentService {

    constructor() { }

    getTotalPaymentByMonth(tasks: any): number {
        console.log(tasks, 'Minhas tasks');
        let totalPaymentByMonth = 0;

        tasks.forEach((task: any) => {   
            totalPaymentByMonth += task.cost;
        });
        return totalPaymentByMonth;
    }


    getTotalBalance(tasks: any): number {
        console.log(tasks, 'Minhas tasks');
        let totalPaymentByMonth = 0;

        tasks.forEach((task: any) => {   
            totalPaymentByMonth += task.cost;
        });
        return totalPaymentByMonth;
    }

}