from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.shortcuts import render
class ConfigureUsers(TemplateView):
    template_name  = "configure.html"

class Transact(TemplateView):
    template_name =  "transact.html"
