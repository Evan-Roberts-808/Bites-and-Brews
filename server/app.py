from flask_migrate import Migrate
from sqlalchemy import func, desc
from flask import Flask, request, session, make_response, jsonify, redirect
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_bcrypt import generate_password_hash
from config import app, db, api, Resource
from models import db, User, Recipe, Cocktail, OurPick, Favorite
import ipdb
import datetime
import traceback

migrate = Migrate(app, db)
login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=user_id).first()

# User Routes


class Signup(Resource):

    def post(self):
        data = request.get_json()
        new_user = User(
            username=data['username'],
            name=data['name'],
            email=data['email'],
        )
        new_user.password_hash = data['password']

        db.session.add(new_user)
        db.session.commit()

        login_user(new_user, remember=True)

        return new_user.to_dict(), 201


class Login(Resource):

    def post(self):
        try:
            data = request.get_json()
            identifier = data.get('identifier')  # Can be email or username
            password = data.get('password')

            user = User.query.filter(
                (User.email == identifier) | (User.username == identifier)
            ).first()

            if user:
                if user.authenticate(password):
                    login_user(user, remember=True)
                    return user.to_dict(), 200
            if not user:
                return {'error': '404 user not found'}, 404
        except:
            return {'error': '401 Unauthorized'}, 401


@app.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return f'You have logged out. Goodbye'


class CheckSession(Resource):

    def get(self):
        if current_user.is_authenticated:
            user = current_user.to_dict()
            return user, 200
        return {"error": "unauthorized"}, 401


# User Details Routes

class Users(Resource):
    @login_required
    def get(self):
        try:
            user = current_user
            if user:
                return {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email
                }, 200
            else:
                return {"error": "User not found"}, 404
        except:
            return {"error": "An error occurred while fetching the user"}, 500

    @login_required
    def patch(self):
        try:
            user = current_user
            if user:
                data = request.get_json()
                user.email = data.get("email", user.email)

                # Hash the password before updating
                password = data.get("password")
                if password:
                    hashed_password = generate_password_hash(password)
                    user._password_hash = hashed_password

                db.session.commit()
                return {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email
                }, 200
            else:
                return {"error": "User not found"}, 404
        except:
            return {"error": "An error occurred while updating the user"}, 500

    @login_required
    def delete(self):
        try:
            user = current_user
            if user:
                db.session.delete(user)
                db.session.commit()
                return {}, 204
            else:
                return {"error": "User not found"}, 404
        except:
            return {"error": "An error occurred while deleting the user"}, 500


class UserFavorites(Resource):

    @login_required
    def get(self):
        try:
            user_id = current_user.id
            favorites = Favorite.query.filter_by(user_id=user_id).all()
            favorites_list = [favorite.to_dict() for favorite in favorites]
            return favorites_list, 200
        except Exception as e:
            return {"error": "An error occurred while fetching favorites", "message": str(e)}, 500

    @login_required
    def post(self):
        try:
            favorite_data = request.get_json()

            favorite_type = favorite_data.get('type')

            if favorite_type == 'recipes':
                new_favorite = Favorite(
                    user_id=current_user.id,
                    recipe_id=favorite_data['id']
                )
            elif favorite_type == 'cocktail':
                new_favorite = Favorite(
                    user_id=current_user.id,
                    cocktail_id=favorite_data['id']
                )
            else:
                return {"error": "Invalid favorite type"}, 400

            db.session.add(new_favorite)
            db.session.commit()

            return "Added to favorites", 201

        except Exception as e:
            return {"error": "Failed to create favorite", "message": str(e)}, 500


class UserFavoritesById(Resource):

    @login_required
    def get(self, id):
        try:
            favorite = Favorite.query.filter_by(id=id).first().to_dict()
            return favorite, 200
        except Exception as e:
            return {"error": "An error occurred while fetching favorite", "message": str(e)}, 500

    @login_required
    def patch(self, id):
        try:
            data = request.get_json()
            favorite = Favorite.query.filter_by(id=id).first()

            if favorite:
                for attr, value in data.items():
                    setattr(favorite, attr, value)
                db.session.commit()
                return favorite.to_dict(), 200
            else:
                return {"error": "favorite not found"}, 404
        except Exception as e:
            return {"error": "Failed to update favorite", "message": str(e)}, 500

    @login_required
    def delete(self, id):
        try:
            favorite = Favorite.query.filter_by(id=id).first()
            if favorite:
                db.session.delete(favorite)
                db.session.commit()
                return {}, 204
            else:
                return {"error": "Favorite not found"}, 404
        except Exception as e:
            return {"error": "an error occurred while deleting the favorite"}, 500


api.add_resource(Login, '/logins')
api.add_resource(Signup, '/signups')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Users, '/users')
api.add_resource(UserFavorites, '/users/favorites')
api.add_resource(UserFavoritesById, '/users/favorites/<int:id>')

# Recipe Routes


class Recipes(Resource):

    def get(self):
        try:
            recipes = [recipe.to_dict() for recipe in Recipe.query.all()]
            return recipes, 200
        except Exception as e:
            return {"error": "Failed to retrieve recipes", "message": str(e)}, 500

    def post(self):
        try:
            recipe_data = request.get_json()

            new_recipe = Recipe(**recipe_data)

            db.session.add(new_recipe)

            db.session.commit()

            return new_recipe.to_dict(), 201

        except Exception as e:
            return {"error": "Failed to create recipe", "message": str(e)}, 500


api.add_resource(Recipes, '/recipe')


class RecipesById(Resource):

    def get(self, id):
        try:
            recipe = Recipe.query.filter_by(id=id).first().to_dict()
            return recipe, 200
        except Exception as e:
            return {"error": "Failed to find recipe", "message": str(e)}, 500

    def patch(self, id):
        try:
            data = request.get_json()
            recipe = Recipe.query.filter_by(id=id).first()

            if recipe:
                for attr, value in data.items():
                    setattr(recipe, attr, value)
                db.session.commit()
                return recipe.to_dict(), 200
            else:
                return {"error": "Recipe not found"}, 404
        except Exception as e:
            return {"error": "Failed to update recipe", "message": str(e)}, 500


api.add_resource(RecipesById, '/recipe/<int:id>')


class PopularRecipes(Resource):
    def get(self):
        sort_by = request.args.get('_sort')
        order = request.args.get('_order')
        limit = request.args.get('_limit')

        valid_sort_fields = ['likes']  # Add more fields if needed
        if sort_by not in valid_sort_fields:
            return {"error": "Invalid sort field"}, 400

        if order == 'desc':
            recipes = Recipe.query.order_by(
                desc(getattr(Recipe, sort_by))).all()
        else:
            recipes = Recipe.query.order_by(getattr(Recipe, sort_by)).all()

        if limit is not None and limit.isdigit():
            recipes = recipes[:int(limit)]

        return [recipe.to_dict() for recipe in recipes]


api.add_resource(PopularRecipes, '/popular_recipes')


class NewestRecipes(Resource):
    def get(self):
        sort_by = request.args.get('_sort')
        order = request.args.get('_order')
        limit = request.args.get('_limit')

        valid_sort_fields = ['id']  # Add more fields if needed
        if sort_by not in valid_sort_fields:
            return {"error": "Invalid sort field"}, 400

        if order == 'desc':
            recipes = Recipe.query.order_by(
                desc(getattr(Recipe, sort_by))).all()
        else:
            recipes = Recipe.query.order_by(getattr(Recipe, sort_by)).all()

        if limit is not None and limit.isdigit():
            recipes = recipes[:int(limit)]

        return [recipe.to_dict() for recipe in recipes]


api.add_resource(NewestRecipes, '/newest_recipes')

# Cocktail Routes


class Cocktails(Resource):

    def get(self):
        try:
            cocktails = [cocktail.to_dict()
                         for cocktail in Cocktail.query.all()]
            return cocktails, 200
        except Exception as e:
            return {"error": "Failed to retrieve Cocktail", "message": str(e)}, 500

    def post(self):
        try:
            cocktail_data = request.get_json()

            new_cocktail = Cocktail(**cocktail_data)

            db.session.add(new_cocktail)

            db.session.commit()

            return new_cocktail.to_dict(), 201

        except Exception as e:
            return {"error": "Failed to create cocktail", "message": str(e)}, 500


api.add_resource(Cocktails, '/cocktail')


class CocktailsById(Resource):

    def get(self, id):
        try:
            cocktail = Cocktail.query.filter_by(id=id).first().to_dict()
            return cocktail, 200
        except Exception as e:
            return {"error": "Failed to find cocktail", "message": str(e)}, 500

    def patch(self, id):
        try:
            data = request.get_json()
            cocktail = Cocktail.query.filter_by(id=id).first()

            if cocktail:
                for attr, value in data.items():
                    setattr(cocktail, attr, value)
                db.session.commit()
                return cocktail.to_dict(), 200
            else:
                return {"error": "cocktail not found"}, 404
        except Exception as e:
            return {"error": "Failed to update cocktail", "message": str(e)}, 500


api.add_resource(CocktailsById, '/cocktail/<int:id>')


class PopularCocktails(Resource):
    def get(self):
        sort_by = request.args.get('_sort')
        order = request.args.get('_order')
        limit = request.args.get('_limit')

        valid_sort_fields = ['likes']  # Add more fields if needed
        if sort_by not in valid_sort_fields:
            return {"error": "Invalid sort field"}, 400

        if order == 'desc':
            cocktails = Cocktail.query.order_by(
                desc(getattr(Cocktail, sort_by))).all()
        else:
            cocktails = Cocktail.query.order_by(
                getattr(Cocktail, sort_by)).all()

        if limit is not None and limit.isdigit():
            cocktails = cocktails[:int(limit)]

        return [cocktail.to_dict() for cocktail in cocktails]


api.add_resource(PopularCocktails, '/popular_cocktails')


class OurPicks(Resource):

    def get(self):
        ourpicks = [pick.to_dict() for pick in OurPick.query.all()]
        return ourpicks, 200


api.add_resource(OurPicks, '/our_picks')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
