from django.contrib import admin
from .models import User, Booking, OTPStorage, Movie, Person

# Register other models normally
admin.site.register(User)
admin.site.register(Booking)
admin.site.register(OTPStorage)
admin.site.register(Person)

# Register Movie with custom MovieAdmin
@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ['title', 'year', 'language', 'genre', 'created_by']
    filter_horizontal = ('cast', 'crew', 'similar_movies')
