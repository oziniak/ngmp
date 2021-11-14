## How to run locally

```
docker run -d --name my-postgres -e POSTGRES_PASSWORD=11111 -e POSTGRES_USER=oleh -p 5432:5432 postgres
```

```
npx prisma init
npx prisma migrate dev --name init
```

```
npm run start
```
