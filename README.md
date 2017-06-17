Multichat on Django using Channels and WebSocket.

Thanks to https://github.com/WitchZone for design and to https://github.com/andrewgodwin for example of using Django channels.

Chat requires:
	1. Python 2.7.x or 3.5.x;
	2. Django 1.10.x;
	3. Django-channels 0.17.3 or higher (I've used 0.20.x);
	4. Redis (becuase channels need messages to be stored in data structure). Redis works on GNU\Linux but there is an unoffical port for Windows. You can lear how to get, install and make it more security friendly here: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis. Redis should be started BEFORE chat.
