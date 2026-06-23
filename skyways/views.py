from django.shortcuts import render

def home(request):
    """Render the premium homepage template."""
    return render(request, 'home.html')
