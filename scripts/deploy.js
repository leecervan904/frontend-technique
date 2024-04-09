import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import checkbox from '@inquirer/checkbox'
import { exec } from 'child_process'

const getDirname = () => path.dirname(fileURLToPath(import.meta.url))

console.log(getDirname());

const listDir = dir => fs
  .readdirSync(path.resolve(getDirname(), dir))
  .map(v => path.resolve(getDirname(), dir, v))

function getAppDirs() {
  return [
    path.resolve(getDirname(), '../wujie'),
    ...listDir('../demo-react'),
    ...listDir('../demo-vue3'),
  ]
}

function getAllApps() {
  return getAppDirs().map(dir => {
    const data = fs.readFileSync(path.resolve(dir, 'package.json'), 'utf-8')
    const appName = JSON.parse(data).name
    return { name: appName, value: appName, path: dir }
  })
}

async function stepBuild(buildApps) {
  return Promise.all(buildApps.map(({ value: app }) => {
    return new Promise((resolve, reject) => {
      exec(`pnpm build --filter ${app}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`执行命令出错: ${error}`);
          reject()
        } else {
          console.log(`${app} 构建完成`);
          resolve()
        }
      })
    })
  }))
}

async function stepDeploy(buildApps) {
  const dest = '/srv/fe-tech/'
  const remote = 'light_tx_2c4g'

  // 使用 rsync 上传
  Promise.all(buildApps.map(({ path: app, fullname }) => {
    return new Promise((resolve, reject) => {
      exec(`
        cd ${app};
        test -e dist.tar.gz && rm -f dist.tar.gz;
        tar -zcf dist.tar.gz dist;
        rsync dist.tar.gz light_tx_2c4g:${dest}${fullname}/;
      `, (error) => {
        if (error) {
          console.error(`执行命令出错: ${error}`);
          reject()
          return
        } else {
          console.log(`${app} 上传完成`);
          resolve()
        }
      })
    })
  })).then(() => {
    // 解压所有 zip 包
    console.log('登录服务器...')

    // console.log(`ssh ${remote} "
    //     ${buildApps.map(app => `
    //       cd ${dest}${app.fullname}/;
    //       tar -zxf dist.tar.gz;
    //     `).join(' ')};
    //     exit;
    //   "`);

    exec(`ssh ${remote} "
      ${buildApps.map(app => `
        cd ${dest}${app.fullname}/;
        tar -zxf dist.tar.gz;
      `).join(' ')};
      exit;
    "`, (error) => {
      if (error) {
        console.error(`执行命令出错: ${error}`);
        return
      } else {
        console.log(`解压完成`);
      }
    })
  })
}

async function run() {
  const list = getAllApps()

  const answer = await checkbox({
    message: '选择需要部署的前端应用：',
    choices: list,
    pageSize: 20,
  })

  const buildApps = list
    .filter(v => answer.includes(v.value))
    .map(v => {
      const [type, name] = v.value.slice(1).split('/')
      return { ...v, fullname: `${type}-${name}` }
    })

  await stepBuild(buildApps)
  // return
  await stepDeploy(buildApps)
}

run()
