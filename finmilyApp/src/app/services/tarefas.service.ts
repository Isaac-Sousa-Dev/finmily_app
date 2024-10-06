export class TarefasService {

    constructor() {}


    getTaskByChild(childId: any) {
        let allTasks = this.getAllTasksOpenByParent(1);
        let arrayOfTasks: any = [];

        allTasks.forEach((task) => {
            if(task.childId === childId) {
                arrayOfTasks.push(task);
            }
        });

        return arrayOfTasks;
    }

    getAllTasksOpenByParent(managerId: any) {
        return [
            {
                id: 1,
                title: 'Varrer a casa',
                description: 'Varrer a casa inteira',
                status: 'Feita',
                cost: 3,
                childName: 'Luiza',
                childId: 1,
                days: [
                    {
                        id: 1,
                        day: 'Seg'
                    },
                    {
                        id: 2,
                        day: 'Ter'
                    },
                    {
                        id: 3,
                        day: 'Qua'
                    },
                    {
                        id: 4,
                        day: 'Qui'
                    }
                ]
            },
            {
                id: 2,
                title: 'Arrumar a cama',
                description: 'Arrumar a cama inteira',
                status: 'Pendente',
                cost: 2,
                childName: 'André',
                childId: 2,
                days: [
                    {
                        day: 'Todo dia'
                    }
                ]
            },
            {
                id: 3,
                title: 'Lavar os pratos',
                description: 'Lavar todos os pratos',
                status: 'Feita',
                cost: 4,
                childName: 'Luiza',
                childId: 1,
                days: [
                    {
                        day: 'Todo dia'
                    }
                ]
            },
            {
                id: 4,
                title: 'Encher as garrafas',
                description: 'Encher a garrafa de água',
                status: 'Feita',
                cost: 10,
                childName: 'André',
                childId: 2,
                days: [
                    {
                        day: 'Todo dia'
                    }
                ]
            }
        ]
    }

}