# dockerized-node-auth

# Reference

# During development

docker-compose up --build

# How do build docker image

docker build -t image name .
example => docker build -t nodeapp .

# how do spin up container

docker run -p 8000:4000 -d -e APPID=8000 nodeapp
docker run -p 8001:4000 -d -e APPID=8001 nodeapp
docker run -p 8002:4000 -d -e APPID=8002 nodeapp

# Haproxy

install haproxy

brew install haproxy

To start haproxy now and restart at login:
brew services start haproxy
Or, if you don't want/need a background service you can just run:
/usr/local/opt/haproxy/bin/haproxy -f /usr/local/etc/haproxy.cfg

After adding cfg

proxy -f test.cfg
