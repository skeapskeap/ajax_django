from django.shortcuts import render
from django.views.generic import View


class AjaxView(View):
    def get(self, request):
        text = request.GET.get('button_text')
        print()
        print(text)
        print()
        return render(request, 'ajax_explore/index.html')