from app import app
from models import db, User, Recipe, Cocktail, OurPick, Favorite
import pickle
from flask_bcrypt import Bcrypt
import random
import os
import ipdb
import json

def seed_database():
    with open('db.json') as json_file:
        data = json.load(json_file)

    if 'recipes' in data:
        for recipe_data in data['recipes']:
            recipe = Recipe(**recipe_data)
            db.session.add(recipe)

        if 'cocktails' in data:
            for cocktail_data in data['cocktails']:
                mapped_cocktail_data = {
                    'type': cocktail_data['type'],
                    'name': cocktail_data['name'],
                    'description': cocktail_data['description'],
                    'image': cocktail_data['image'],
                    'source': cocktail_data['source'],
                    'preptime': cocktail_data['preptime'],
                    'waittime': cocktail_data['waittime'],
                    'cooktime': cocktail_data['cooktime'],
                    'totaltime': cocktail_data['totaltime'],
                    'servings': cocktail_data['servings'],
                    'comments': cocktail_data['comments'],
                    'likes': cocktail_data['likes'],
                    'instructions': cocktail_data['instructions'],
                    'ingredients': cocktail_data['ingredients'],
                    'drink_type': cocktail_data['drink-type'],  # Map to the correct column name
                    'alcohol_type': cocktail_data['alcohol-type'],  # Map to the correct column name
                }
                cocktail = Cocktail(**mapped_cocktail_data)
                db.session.add(cocktail)

    if 'ourPicks' in data:
        for ourpick_data in data['ourPicks']:
            ourpick = OurPick(**ourpick_data)
            db.session.add(ourpick)

    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        # seed_database()
        pass