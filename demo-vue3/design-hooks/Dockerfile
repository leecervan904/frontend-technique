# 使用官方 Node.js 镜像作为基础镜像
FROM node:16-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 prisma 文件到工作目录
COPY package*.json ./
COPY prisma ./prisma
COPY .env.prod ./.env

# 安装依赖
RUN npm install

# 复制应用程序源代码到工作目录
COPY server ./server

# 构建应用程序
# RUN npm run build

# 为生产环境设置环境变量
# ENV NODE_ENV production

# 暴露应用程序运行所需的端口
EXPOSE 3020

# RUN npm run db:push

# 启动应用程序
CMD npx prisma generate; npm run db:push; npm run start;
# CMD ["npm", "run", "start"]
