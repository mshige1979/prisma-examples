# prisma-examples

## リレーション確認用2

### git clone

```
git clone https://github.com/mshige1979/prisma-examples.git
```

### git checkout

```
cd prisma-examples
git checkout -b relation1 origin/relation2
```

### docker build

```
docker-compose build
```

### docker 初期設定

```
docker-compose up -d db
docker-compose run --rm backend npm install

```

### 取り込み

```
docker-compose run --rm backend npx prisma migrate deploy
```

### データ投入

```
docker-compose run --rm backend npx prisma db seed
```

### テスト実行
```
docker-compose run --rm backend npx ts-node ./src/index.ts
```
