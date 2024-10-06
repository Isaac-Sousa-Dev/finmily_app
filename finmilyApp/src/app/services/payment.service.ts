export class PaymentService {

    constructor() { }

    getTotalPaymentByMonth(tasks: any): number {
        let totalPaymentByMonth = 0;

        tasks.forEach((task: any) => {
            totalPaymentByMonth += task.cost;
        });
        return totalPaymentByMonth;
    }

}