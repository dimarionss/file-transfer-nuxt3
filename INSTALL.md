# Installation

```bash
sudo apt update
sudo apt upgrade

sudo apt install nginx

cd /var/www/
sudo git clone https://gitlab.com/vantino/einblik/eblk-nuxt2.git
sudo chown -R {REPLACE-WITH-CURRENT-USER}:www-data eblk-nuxt2
```
## edit configuration
```bash
cd eblk-nuxt2
vi .env
```
## env variables

```bash
SERVER_NAME = dev.einblik.com
PREFERRED_URL_SCHEME = https
SECRET_KEY = mDnWGs9$Ca#+@XUb

FLASK_APP = eblk.py
FLASK_ENV = development

AUTH0_CLIENT_ID = skeG9w7xdJ6wR1kQ9QbWBVgJHpkamuZ3
AUTH0_CLIENT_SECRET = 3yH1WBit8g9W_TD7ckgupiun9D-YGxAOMKE6bd_5zg8JzEhVNgDfqmCJYCuSbyvS
AUTH0_CALLBACK_URL_LOCAL = http://localhost:3000/auth/callback
AUTH0_CALLBACK_URL_SERVER = https://dev2.einblik.com/auth/callback
AUTH0_DOMAIN = einblik.eu.auth0.com
AUTH0_AUDIENCE = https://api.eb.lk

AUTH0_API_CLIENT_ID = '6cgUDflFmCJ90iELHlsHFHHBNOTmOewn'
AUTH0_API_CLIENT_SECRET = 'OJ1DYjhHe0bSo9Ywiw9WeaDEIsnOIFUMnawwh237BqgHMa2fMolKNqOnpVwKySbV'

DEFAULT_DOMAIN = 'eb.lk'
DEFAULT_DOMAIN_ID = '05cc81f2-7b5b-4f0a-9294-1ebf19cffd00'

BASE_URL_ADMIN = 'https://api.eb.lk/v2/admin'
BASE_URL_SHRT = 'https://api.eb.lk/v2/shrt'
BASE_URL_STS = 'https://api.eb.lk/v2/sts'

PROFILE_KEY = 
JWT_PAYLOAD =

HASURA_ENDPOINT=https://admin.eb.lk/v1/graphql
```

## https://github.com/nvm-sh/nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

vi ~/.bashrc

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

source ~/.bashrc
```
## 0.39.1 
```bash
nvm -v
nvm list-remote

nvm install node
npm -v
```
## v18.8.0
```bash
node -v

npm install --global yarn
yarn install

export NODE_OPTIONS=--openssl-legacy-provider
yarn build
yarn start
```
## install nginx 
```bash
sudo rm /etc/nginx/sites-enabled/default
sudo vi /etc/nginx/sites-enabled/<domain>

sudo /etc/init.d/nginx restart

---
upstream service-http {
  server 127.0.0.1:3000;
}

server {

        server_name <domain>;

        location / {
                proxy_pass http://service-http;

                proxy_set_header Host               $host;
                proxy_set_header X-Real-IP          $remote_addr;
                proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto  $scheme;
        }

    
}
sudo ln -s /etc/nginx/sites-available/eblk-nuxt2 /etc/nginx/sites-enabled/eblk-nuxt2

```
## install certificate:
```bash
sudo apt-get update
sudo apt-get install certbot
sudo apt-get install python3-certbot-nginx
sudo certbot --nginx -d <domain>
```
## install pm2 module:
```bash
sudo npm install pm2@latest -g

#add file ecosystem.config.js
# must be contain: 

module.exports = {
  apps: [
    {
      name: 'NuxtAppName',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
example official doc: https://nuxt.com/docs/getting-started/deployment
```
## deploy a new version
```bash
cd /var/www/enblk/
git pull
export NODE_OPTIONS=--openssl-legacy-provider
yarn build
pm2 start
pm2 startup
```
## additional commands for pm2
```bash
pm2 status
pm2 delete <number app>
pm2 restart <number app>
```