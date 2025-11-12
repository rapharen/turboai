from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Note


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'password')


class CategorySerializer(serializers.ModelSerializer):
    note_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'color', 'note_count')


class NoteSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )

    class Meta:
        model = Note
        fields = ('id', 'title', 'content', 'category', 'category_id', 'last_updated')
