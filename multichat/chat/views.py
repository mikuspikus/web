from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Room
from .forms import UserForm, UserProfileForm
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib import messages

@login_required
def chat_rooms(request):
    """
    Root page view. This is essentially a single-page app, if you ignore the
    login and admin parts.
    """
    # Get a list of rooms, ordered alphabetically
    rooms = Room.objects.order_by("title")

    # Render that in the index template
    return render(request, "chat_rooms.html", {
        "rooms": rooms,
    })

def register(request):
    print('Calling REGISTER VIEW')
    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileForm()

        if user_form.is_valid() and user_form.cleaned_data['password'] == user_form.cleaned_data['password_confirmation']:
            print(' USER is valid')
            user = user_form.save()
            user.set_password(user.password)
            user.save()

            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()

            messages.info(request, 'Thanks for your registration!')
            new_user = authenticate(username=user_form.cleaned_data['username'],
                password=user_form.cleaned_data['password'])
            login(request, new_user)
            print(' New user logged in')
            return HttpResponseRedirect(reverse('chat_rooms'))
        elif user_form.data['password'] != user_form.data['password_confirmation']:
            user_form.add_error('password_confirmation', 'The passwords do not match')
        else:
            print(user_form.errors)
            print(profile_form.errors)
    else:
        user_form = UserForm()
        profile_form = UserProfileForm()

    return render(request, 'register.html', {
        'user_form' : user_form, 
        'profile_form' : profile_form, 
    })

def user_login(request):
    print('Called LOGIN VIEW')
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)

        if user:
            login(request, user)
            messages.info(request, 'You are now logged in')
            return HttpResponseRedirect(reverse('chat_rooms'))
        else:
            messages.warning(request, 'Invalid login details')
            return render(request, 'login.html')
    else:
        return render(request, 'login.html')

@login_required
def user_logout(request):
    logout(request)
    messages.info(request, 'You are now logged out')
    return HttpResponseRedirect(reverse('index'))

def index(request):
    context = {}
    return render(request, 'index.html', context)
