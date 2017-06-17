from django.conf.urls import url
from django.contrib import admin
from chat import views #import index, login, logout, register, chat_rooms


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^login/$', views.user_login, name='login'),
    url(r'^logout/$', views.user_logout, name='logout'),
    url(r'^register/$', views.register, name='register'),
    url(r'^chat_rooms/$', views.chat_rooms, name='chat_rooms'),
    url(r'^admin/', admin.site.urls),
]
