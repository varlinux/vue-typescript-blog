#!/bin/bash
# 部署环境脚本

# 安装node环境
wget https://npm.taobao.org/mirrors/node/v14.15.4/node-v14.15.4-linux-x64.tar.xz
tar -xf node-v14.15.4-linux-x64.tar.xz
mkdir /usr/local/node
mv node-v14.15.4-linux-x64/ /usr/local/node/

# 配置系统全局变量
ln -s /usr/local/node/node-v14.15.4-linux-x64/bin/node /usr/bin/node
ln -s /usr/local/node/node-v14.15.4-linux-x64/bin/npm /usr/bin/npm

# 自定义node，npm安装文件目录
mkdir /usr/local/node/node_global
mkdir /usr/local/node/node_cache
npm config set prefix "/usr/local/node/node_global"
npm config set cache "/usr/local/node/node_cache"

# 安装PM2项目运行环境
npm install -g pm2 --registry=https://registry.npm.taobao.org
