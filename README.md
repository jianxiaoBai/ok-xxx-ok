# mine-official

> Nuxt.js project
renml 20180914
## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

data-.*?=""

\[data-.*?\]

https://blockchain.info/q/addressbalance/1EzwoHtiXB4iFwedPr49iywjZn2nnekhoj

scp -r  /Users/baixiaojian/Sites/project/truechain/mine-official/dist root@45.40.243.125:/root/server/miner-official

pm2 start /root/.nvm/versions/node/v8.11.2/bin/http-server --name miner -- -p 8082 -d false
pm2 start ./node_modules/nuxt/bin/nuxt
pm2 start npm --name "miner-off" -- run start
