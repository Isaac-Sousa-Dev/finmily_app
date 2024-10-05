export class ChildService {

    constructor() {}

    getChildById(childId: number): any {
        let allChildrens = this.getAllChildrensByParent(1);
        let childInfo: any;

        allChildrens.forEach(child => {
            if(child.id === childId) {
                childInfo = child;
            }
        });
        return childInfo;
    }

    getAllChildrensByParent(parentId: number): any[] {
        return [
            {
                id: 1,
                name: 'Luiza',
                age: 10,
                balance: 10,
            },
            {
                id: 2,
                name: 'André',
                age: 8,
                balance: 20,
            },
        ]
    }
}