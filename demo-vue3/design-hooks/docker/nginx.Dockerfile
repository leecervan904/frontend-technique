# 使用官方 Nginx 镜像作为基础镜像
FROM nginx:latest

# 将当前目录下的所有文件复制到 Nginx 服务器的 /usr/share/nginx/html 目录下
COPY ./dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# 可选：暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
