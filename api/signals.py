from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Category

@receiver(post_save, sender=User)
def create_default_categories(sender, instance, created, **kwargs):
    if created:
        categories_data = [
            {'name': 'Random Thoughts', 'color': '#EF9C66'},
            {'name': 'School', 'color': '#FCDC94'},
            {'name': 'Personal', 'color': '#C8CFA0'},
            {'name': 'Work', 'color': '#78ABA8'},
        ]
        for cat_data in categories_data:
            Category.objects.create(
                user=instance,
                name=cat_data['name'],
                color=cat_data['color']
            )
