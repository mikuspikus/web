# Multichat on Django using Channels and WebSocket

Thanks to [witchzone](https://github.com/WitchZone) for design and to [andrewgodwin](https://github.com/andrewgodwin) for example of using Django channels.

Chat requires:
* [Python 2.7.x or 3.5.x](https://www.python.org/);
* [Django 1.10.x](https://www.djangoproject.com/);
* [Django-channels](https://channels.readthedocs.io/en/stable/) 0.17.3 or higher (I've used 0.20.x);
* [Redis](https://redis.io/) or another DB (becuase channels need messages to be stored in data structure). 

## Redis
```Redis``` works on GNU\Linux but there is an unofficial [port](https://github.com/rgl/redis/downloads) for Windows. You can learn how to get, install and make it more security friendly for GNU\Linux [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis).
Redis should be started BEFORE chat.

### Django and django-channels
For installing django you can use [pip](https://pypi.python.org/pypi/pip):
```
pip install django
```
and the same for django-channels:
```
pip install channels
```
