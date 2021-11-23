import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

// モデル投入用のデータ定義
const userData: Prisma.UserCreateInput[] = [
    {
        name: 'hoge1',
        email: 'hoge1@example.com',
        age: 20,
        profile: {
            create: {
                nickName: "aaaa"
            }
        },
        posts: {
            create: [
                { title: "test1" },
                { title: "test2" },
                { title: "test3" },
            ]
        }
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
    const queryList = [];

    // 削除用データ取得
    const postAll = await prisma.post.findMany()
    postAll.map((post) => {
        // 削除
        const deletePost = prisma.post.deleteMany({
            where: {
                id: post.id,  
            },            
        })
        queryList.push(deletePost);
    })

    const profileAll = await prisma.profile.findMany()
    profileAll.map((profile) => {
        // 削除
        const deleteProfile = prisma.profile.deleteMany({
            where: {
                id: profile.id,  
            },            
        })
        queryList.push(deleteProfile);
    })

    const userAll = await prisma.user.findMany()
    userAll.map((user) => {
        // 削除
        const deleteUser = prisma.user.deleteMany({
            where: {
                id: user.id,  
            },            
        })
        queryList.push(deleteUser);
    })

    // 登録用データ設定
    for (const u of userData) {
        const user = prisma.user.create({
            data: u,
        })
        queryList.push(user);
    }
    return await prisma.$transaction(queryList);
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
