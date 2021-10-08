A Real Time Chat Application built using Node.js, Express, Redis and Socket.io

## Index
+ [Features](#features)
+ [Installation](#installation)
+ [Contributors](#Contributors)
+ [License](#license)


## Features<a name="features"></a>
+ Uses Express as the application Framework.
+ Real-time communication between a client and a server using [Socket.io](https://github.com/socketio/socket.io).
+ Uses [Redis](https://redis.io/) for broadcasting active users. Also as in-memory data store.
+ Dockerized and uses docker-compose file.
+ Running multiple clusters(each cluster is independent from each other)

## Installation <a name="installation"></a>
### Running Locally
Make sure you have [Docker](https://docs.docker.com/v17.09/engine/installation/#cloud) and [Docker-compose](https://docs.docker.com/compose/install/) installed.

1. Clone or Download the repository
	```
	$ git clone https://github.com/alexsanzru/socket-node-chat
	$ cd socket-node-chat
	```
	
3. Start the application

	```
	$ sudo docker-compose up
	```
	
Your app should now be running on [localhost:8888](http://localhost:8888/).
