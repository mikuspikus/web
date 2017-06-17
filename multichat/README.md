# Multichat on Django using Channels and WebSocket.

Thanks to [witchzone](https://github.com/WitchZone) for design and to [andrewgodwin](https://github.com/andrewgodwin) for example of using Django channels.

Chat requires:
* Python 2.7.x or 3.5.x;
* Django 1.10.x;
* Django-channels 0.17.3 or higher (I've used 0.20.x);
* Redis (becuase channels need messages to be stored in data structure). 
## Redis
Redis works on GNU\Linux but there is an unofficial port for Windows. You can lear how to get, install and make it more security friendly here: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis (for GNU\Linux). 
Redis should be started BEFORE chat.
