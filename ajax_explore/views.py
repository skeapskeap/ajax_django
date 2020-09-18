from django.shortcuts import render
from django.views.generic import View
from time import time
from django.http import JsonResponse


class AjaxView(View):
    def get(self, request):
        text = request.GET.get('button_text')

        if request.is_ajax():
            t = time()
            return JsonResponse({'seconds': t}, status=200)

        return render(request, 'ajax_explore/index.html')

    def post(self, request):
        card_text = request.POST.get('text')
        result = f'Card {card_text}'
        return JsonResponse({'data': result}, status=200)
