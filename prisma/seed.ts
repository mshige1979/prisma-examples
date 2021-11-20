import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

// モデル投入用のデータ定義
const userData: Prisma.UserCreateInput[] = [
    {
        name: 'hoge1',
        email: 'hoge1@example.com',
        age: 20,
    },
    {
        name: 'hoge2',
        email: 'hoge2@example.com',
        age: 43,
    },
    {
        name: 'hoge3',
        email: 'hoge3@example.com',
        age: 19,
    },
]

const transfer = async () => {
    const users = [];

    // 削除用データ取得
    const userAll = await prisma.user.findMany()
    userAll.map((user) => {
        // 削除
        const deleteUsser = prisma.user.deleteMany({
            where: {
                id: user.id
            }
        })
        users.push(deleteUsser);
    })

    // 登録用データ設定
    for (const u of userData) {
        const user = prisma.user.create({
            data: u,
        })
        users.push(user);
    }
    return await prisma.$transaction(users);
}

// 定義されたデータを実際のモデルへ登録する処理
const main = async () => {
    console.log(`Start seeding ...`)

    await transfer();

    console.log(`Seeding finished.`)
}

// 処理開始
main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
