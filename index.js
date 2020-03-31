'use strict';

const startCluster = require('egg-cluster').startCluster;
const Etcd3 = require('etcd3');
const fs = require('fs');

const env = {
  dev: 'local',
  local: 'local',
  development: 'local',
  test: 'testing',
  testing: 'testing',
  prod: 'production',
  production: 'production',
  product: 'production'
}
const serverOptions = {
  baseDir: __dirname,
};
const etcdConfig = {};

//正式服启动环境变量必须，防止连接到测试服
if (!process.env.NODE_ENV && !process.env.EGG_SERVER_ENV) {
  fs.writeFileSync('./logs/startError.log', 'There is no NODE_ENV or EGG_SERVER_ENV', { flag: 'w' })
  process.exit(1);
} else if (process.env.NODE_ENV) {
  //node环境映射到egg环境
  process.env.EGG_SERVER_ENV = env[process.env.NODE_ENV]
}

if (process.env.EGG_SERVER_ENV === 'local') {
  serverOptions.workers = 1;
  etcdConfig.hosts = [
    "http://192.168.10.222:32771",
    "http://192.168.10.222:32769",
    "http://192.168.10.222:32773"
  ]
} else if (process.env.EGG_SERVER_ENV === 'testing') {
  serverOptions.workers = 1;
  etcdConfig.hosts = [
    "http://192.168.10.222:32771",
    "http://192.168.10.222:32769",
    "http://192.168.10.222:32773"
  ]
} else if (process.env.EGG_SERVER_ENV === 'production') {
  serverOptions.workers = 2;
  etcdConfig.hosts = [
    "172.17.0.49:32771",
    "172.17.0.49:32769",
    "172.17.0.49:32773"
  ]
} else {
  fs.writeFileSync('./logs/startError.log', 'There is no NODE_ENV or EGG_SERVER_ENV', { flag: 'w' })
  process.exit(1)
}


(async () => {
  const etcd = new Etcd3.Etcd3(etcdConfig);
  try {
    const res = await etcd.getAll();
    fs.writeFileSync("./config/etcd.json", JSON.stringify(res), { flag: 'w' })
  } catch (error) {
    fs.writeFileSync('./logs/startError.log', 'There is an error occured for getting config from Etcd =>' + error.toString(), { flag: 'w' })
    process.exit(1)
  }

  startCluster(serverOptions);
})();