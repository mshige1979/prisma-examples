import express from 'express'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// express server
const app = express()

// リクエストデータをjsonで受け取れるようにする
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// ユーザー一覧
app.get('/users', async (req, res) => {
    // ユーザー一覧を取得
    const users = await prisma.user.findMany({})

    // 返却
    res.json(users)
})

// ユーザー詳細
app.get('/user/:id', async (req, res) => {
    // パラメータを取得
    const { id } = req.params;
    // ユーザー情報を取得
    const user = await prisma.user.findFirst({
        where: {
            id: Number(id)
        }
    })

    // 返却
    res.json(user)
})

// ユーザー登録
app.post('/user', async (req, res) => {
    // パラメータ取得
    console.log(req.body);
    const { email, name } = req.body;

    // この辺でバリデーション

    // 登録
    const user = await prisma.user.create({
        data: {
            "email": email,
            "name": name
        }
    })

    // 返却
    res.json({
        "status": 0,
        "result": user
    })
})

// ユーザー更新
app.put('/user/:id', async (req, res) => {
    // パラメータ取得
    console.log(req.body);
    const { id } = req.params;
    const { email, name } = req.body;

    // この辺でバリデーション


    // 登録
    const user = await prisma.user.update({
        where: {
            "id": Number(id)
        },
        data: {
            "email": email,
            "name": name,
            "updatedAt": new Date()
        }
    })

    // 返却
    res.json({
        "status": 0,
        "result": user
    })
})


// ユーザー削除
app.delete('/user/:id', async (req, res) => {
    // パラメータを取得
    const { id } = req.params;
    // ユーザー情報を削除
    const user = await prisma.user.deleteMany({
        where: {
            id: Number(id)
        }
    })

    // 返却
    // 返却
    res.json({
        "status": 0,
        "result": user
    })
})


// server listen
const server = app.listen(3000)
