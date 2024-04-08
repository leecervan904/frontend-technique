# 使用官方 Nginx 镜像作为基础镜像
FROM nginx:latest

# copy nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

# copy all app's dist directory
COPY ./demo-vue3/design-hooks/dist /usr/share/nginx/html/vue3-design-hooks
COPY ./demo-react/router-v6/dist /usr/share/nginx/html/react-router-v6
COPY ./demo-react/component-design/dist /usr/share/nginx/html/react-component-design
COPY ./demo-react/state-redux-toolkit/dist /usr/share/nginx/html/react-state-redux-toolkit
COPY ./demo-react/state-mobx/dist /usr/share/nginx/html/react-state-mobx
COPY ./demo-react/state-zustand/dist /usr/share/nginx/html/react-state-zustand
COPY ./demo-react/state-jotai/dist /usr/share/nginx/html/react-state-jotai

COPY ./wujie/dist /usr/share/nginx/html

# 可选：暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
