# prisma-examples

## リレーション確認用

### git clone

```
git clone https://github.com/mshige1979/prisma-examples.git
```

### git checkout

```
cd prisma-examples
git checkout -b relation1 origin/relation1
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
