# md5-spider

A javascript website md5 change detector.

## Prepare settings

```json
{
  "url": "<your site>",
  "check_interval": 10,
  "ignores": [
    "<script[A-Za-z0-9\" :/\\.=\\-\\|\\n\\*\\!;\\/\\_\\s\\[\\]{}]*>([A-Za-z0-9\" :/\\.=\\-\\|\\n\\*\\!;\\/\\_\\s\\[\\]{}]+(<!\\[CDATA\\[)[A-Za-z0-9\" :/\\.=\\-\\|\\n\\*\\!;\\/\\_\\s\\[\\]{}<>]+(\\]\\{}]+>)?[A-Za-z0-9\" :/\\.=\\-\\|\\n\\*\\!;\\/\\_\\s\\[\\]{}]+)?<\\/script>"
  ],
  "db_file": "/var/local/md5spider/db.json",
  "recipients": [
    "your recipients"
  ],
  "smtp": {
    "server": "<your smtp server>",
    "port": 587,
    "from": "<your sender address>",
    "username": "<your smtp username>",
    "password": "<your smtp password>"
  }
}
```

## Usage

### Docker

```shell script
docker run \
  -v $(pwd)/settings.json:/settings.json \
  -v $(pwd)/.db:/var/local/md5spider \
  borisskert/md5spider:latest
```

### docker-compose

```shell script
version: '3'

services:
  md5spider:
    image: borisskert/md5spider:latest
    volumes:
    - ./settings.json:/settings.json:ro
    - ./.db:/var/local/md5spider:rw
```

## Links

* [md5-spider @ hub.docker.com](https://hub.docker.com/repository/docker/borisskert/md5spider)
