from rest_framework import serializers
from .models import User, Booking, Movie, Person

class UserSerializer(serializers.ModelSerializer):
    userId = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = User
        fields = ['userId', 'first_name', 'last_name', 'email', 'mobile', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'name', 'role', 'image']

# ✅ Lightweight serializer for similar movies
class MovieSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'image', 'language', 'year']

class MovieSerializer(serializers.ModelSerializer):
    cast = PersonSerializer(many=True, read_only=True)
    crew = PersonSerializer(many=True, read_only=True)
    similar_movies = MovieSummarySerializer(many=True, read_only=True)  # ✅ Replace SerializerMethodField

    class Meta:
        model = Movie
        fields = '__all__'
        read_only_fields = ['created_by']
