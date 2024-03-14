# 设计 vue3 hooks

# 启动

安装依赖：

```sh
pnpm i
```

## 后端

- 后端依赖 mysql 数据库，先确保你的电脑已经配置好
- 接着复制一份 `.env.example` 为 `.env`，配置数据库的连接信息，后续 prisma 会读取 `DATABASE_URL` 这个变量

```conf
DATABASE_URL="mysql://root:password@localhost:3306/fet-vue3-design-hooks"
# root                  数据库用户名
# password              数据库密码
# localhost:3306        数据库服务的地址和端口
# fet-vue3-design-hooks 数据库名称，不冲突即可
```

- 然后是 prisma 的初始化命令，用于构建数据表

```sh
pnpm --filter @vue3/desing-hooks db:push
```

- 最后，启动后端服务

```sh
pnpm --filter @vue3/desing-hooks start
```

## 前端

启动：

```sh
pnpm --filter @vue3/desing-hooks dev
```
