## demos

### wujie

微前端主应用，页面首页

### vue3

- [hooks demo](./demo-vue3/design-hooks/README.md)

### react

## 部署方式

### 分别部署

- 前端：部署到 nginx
- 后端：部署到 docker `node`/`mysql` 镜像，并建立联系（docker-compose network）

优点：

- 后端能够在多个项目共享

缺点：

- 需要开放并占用服务器端口，还要在服务器的 nginx 配置反向代理

或者，所有接口配置在同域中，再转发请求：

```
//example.com/api/service-a/page?page=1&pageSize=10

//example.com/api/service-b/page?page=1&pageSize=10

//example.com/api/service-c/page?page=1&pageSize=10
```

### 统一部署

- 前端：部署到 docker nginx 镜像
- 后端：部署到 docker `node`/`mysql` 镜像
- docker-compose：将几个镜像使用 `network` 联系起来

优点：

- 多个子项目彼此隔离，不需要对外暴露端口

缺点：

- 需要在 nginx 镜像中解决微前端的跨域问题（已解决）
- 后端没有暴露端口，无法共享

## 部署工具

### 根 docker

每次都要 build 所有应用，然后构建 docker 镜像，然后部署到 nginx 中。

### gitlab

部署在服务器的特定目录下，由 nginx 转发。

可以根据变更，只构建发生变化的应用，然后推送到服务器。
