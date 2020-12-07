# md5-spider

A javascript website md5 change detector.

## Prepare settings

```json
{
  "url": "<your site>",
  "check_interval": 10,
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
