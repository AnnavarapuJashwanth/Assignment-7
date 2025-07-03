from django.db import models
from django.utils import timezone

# -------------------------------
# User and OTP Models
# -------------------------------
class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    mobile = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True, default='temp@example.com')
    password = models.CharField(max_length=128)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class OTPStorage(models.Model):
    mobile = models.CharField(max_length=15, unique=True)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now=True)

# -------------------------------
# Booking Model
# -------------------------------
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    theatreId = models.CharField(max_length=255, null=True, blank=True)
    date = models.CharField(max_length=50)
    qty = models.IntegerField()
    seatType = models.CharField(max_length=50)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    gst = models.DecimalField(max_digits=10, decimal_places=2)
    grandTotal = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(default=timezone.now)
    mobileNumber = models.CharField(max_length=20)

    # Optional fields for events/plays
    eventId = models.CharField(max_length=100, null=True, blank=True)
    eventName = models.CharField(max_length=255, null=True, blank=True)
    venue = models.CharField(max_length=255, null=True, blank=True)
    ticketType = models.CharField(max_length=50, null=True, blank=True)
    category = models.CharField(max_length=50, null=True, blank=True)
    time = models.CharField(max_length=20, null=True, blank=True)

# -------------------------------
# Person Model for Cast & Crew
# -------------------------------
class Person(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=100)  # Actor, Director, Musician, etc.
    image = models.URLField()

    def __str__(self):
        return self.name

# -------------------------------
# Movie Model
# -------------------------------
class Movie(models.Model):
    title = models.CharField(max_length=255)
    year = models.PositiveIntegerField()
    rating = models.FloatField()
    directors = models.CharField(max_length=255)
    producers = models.CharField(max_length=255)
    reviews = models.TextField(blank=True)
    image = models.URLField()  # Poster image
    language = models.CharField(max_length=50)
    genre = models.CharField(max_length=100)
    format = models.CharField(max_length=50)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    # Relations
    cast = models.ManyToManyField(Person, related_name='cast_movies', blank=True)
    crew = models.ManyToManyField(Person, related_name='crew_movies', blank=True)
    similar_movies = models.ManyToManyField('self', symmetrical=False, blank=True)

    def __str__(self):
        return f"{self.title} ({self.year}) - {self.language}"
