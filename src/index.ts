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
        },
    })    
    console.log("case2: ", user2)

    // ユーザー + プロフィール条件指定
    // hasOneの場合は子の条件の指定は不可能
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
        },
    })    
    console.log("case3: ", user3)

    // プロフィール + ユーザー
    const profile1 = prisma.profile.findFirst({
        where: {
            nickName: 'aaaa'
        },
    });
    const user4 = await profile1.user();
    profile1.then((result) => {
        console.log("case4: ", result, user4);
    })
}

main().catch((e) => {
    throw e;
    
}).finally(async () => {
    await prisma.$disconnect();
    
})