import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
    // ユーザーのみ
    const user1 = await prisma.user.findFirst({
        where: {
            name: 'hoge1'
        },
    })    
    console.log("case1: ", user1)

    // ユーザー + プロフィール
    const user2 = await prisma.user.findFirst({
        where: {
            name: 'hoge1'
        },
        include: {
            profile: true,
            posts: true
        },
    })    
    console.log("case2: ", user2)

    // ユーザー + 記事条件指定
    // hasOneの場合は子の条件の指定は不可能
    // hasManyの場合は条件の絞り可能
    const user3 = await prisma.user.findFirst({
        where: {
            name: 'hoge1'
        },
        include: {
            profile: {
                select: {
                    nickName: true,
                    createdAt: true,
                },
            },
            posts: {
                select: {
                    title: true
                },
                where: {
                    title: "test1"
                }
            }
        },
    })    
    console.log("case3: ", user3)

    // プロフィール + ユーザー
    const post1 = prisma.post.findFirst({
        where: {
            title: 'test1'
        },
    });
    const user4 = await post1.user();
    post1.then((result) => {
        console.log("case4: ", result, user4);
    })
}

main().catch((e) => {
    throw e;
    
}).finally(async () => {
    await prisma.$disconnect();
    
})