export class TarefasService {

    getAllTasksByManager(managerId: any) {
        return [
            {
                id: 1,
                titulo: 'Varrer a casa',
                descricao: 'Varrer a casa inteira',
                status: 'Feita',
                valor: 3,
                filhoName: 'Luiza',
                idFilho: 1
            },
            {
                id: 2,
                titulo: 'Arrumar a cama',
                descricao: 'Arrumar a cama inteira',
                status: 'Pendente',
                valor: 2,
                filhoName: 'André',
                idFilho: 2 
            },
            {
                id: 3,
                titulo: 'Lavar os pratos',
                descricao: 'Lavar todos os pratos',
                status: 'Feita',
                valor: 4,
                filhoName: 'Luiza',
                idFilho: 1
            },
            {
                id: 4,
                titulo: 'Encher as garrafas',
                descricao: 'Encher a garrafa de água',
                status: 'Feita',
                valor: 5,
                filhoName: 'André',
                idFilho: 2
            },
            {
                id: 5,
                titulo: 'Encher as garrafas',
                descricao: 'Encher a garrafa de água',
                status: 'Feita',
                valor: 5,
                filhoName: 'André',
                idFilho: 2
            },
            {
                id: 6,
                titulo: 'Encher as garrafas',
                descricao: 'Encher a garrafa de água',
                status: 'Feita',
                valor: 5,
                filhoName: 'André',
                idFilho: 2
            }
        ]
    }

}