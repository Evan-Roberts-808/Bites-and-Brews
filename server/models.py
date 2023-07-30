from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from flask_login import UserMixin, LoginManager
import re
from datetime import datetime

from config import db, bcrypt


class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    _password_hash = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # Relationships

    # Serialize Rules
    # serialize_rules = ()

    # Validations
    @validates('email')
    def validate_email(self, key, email):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError('Invalid email format')
        return email

    @validates('username')
    def validate_username(self, key, username):
        if not username and len(username) < 1:
            raise ValueError('Invalid username')
        return username

    # password hashing
    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))


class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    name = db.Column(db.String)
    description = db.Column(db.Text)
    image = db.Column(db.String)
    source = db.Column(db.String)
    preptime = db.Column(db.String)
    waittime = db.Column(db.String)
    cooktime = db.Column(db.String)
    totaltime = db.Column(db.String)
    servings = db.Column(db.Integer)
    comments = db.Column(db.ARRAY(db.Text))
    likes = db.Column(db.Integer)
    instructions = db.Column(db.ARRAY(db.String))
    ingredients = db.Column(db.ARRAY(db.String))
    cuisine = db.Column(db.String)
    course = db.Column(db.String)
    vegetarian = db.Column(db.Boolean)
    meat = db.Column(db.ARRAY(db.String))
    contains = db.Column(db.ARRAY(db.String))


class Cocktail(db.Model, SerializerMixin):
    __tablename__ = 'cocktails'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    name = db.Column(db.String)
    description = db.Column(db.Text)
    image = db.Column(db.String)
    source = db.Column(db.String)
    preptime = db.Column(db.String)
    waittime = db.Column(db.String)
    cooktime = db.Column(db.String)
    totaltime = db.Column(db.String)
    servings = db.Column(db.Integer)
    comments = db.Column(db.ARRAY(db.Text))
    likes = db.Column(db.Integer)
    instructions = db.Column(db.ARRAY(db.Text))
    ingredients = db.Column(db.ARRAY(db.Text))
    drink_type = db.Column(db.String)
    alcohol_type = db.Column(db.ARRAY(db.String))


class OurPick(db.Model, SerializerMixin):
    __tablename__ = 'ourpicks'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    pick = db.Column(db.String)
    name = db.Column(db.String)
    description = db.Column(db.Text)
    image = db.Column(db.String)
    source = db.Column(db.String)
    preptime = db.Column(db.String)
    waittime = db.Column(db.String)
    cooktime = db.Column(db.String)
    totaltime = db.Column(db.String)
    servings = db.Column(db.Integer)
    comments = db.Column(db.ARRAY(db.Text))
    likes = db.Column(db.Integer)
    instructions = db.Column(db.ARRAY(db.String))
    ingredients = db.Column(db.ARRAY(db.String))
    cuisine = db.Column(db.String)
    course = db.Column(db.String)
    vegetarian = db.Column(db.Boolean)
    meat = db.Column(db.ARRAY(db.String))
    contains = db.Column(db.ARRAY(db.String))


class Favorite(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    cocktail_id = db.Column(db.Integer, db.ForeignKey('cocktails.id'))

    # Define relationships with the User, Recipe, and Cocktail models
    user = db.relationship(
        'User', backref=db.backref('favorites', lazy='dynamic'))
    recipe = db.relationship('Recipe', backref=db.backref(
        'favorited_by', lazy='dynamic'))
    cocktail = db.relationship(
        'Cocktail', backref=db.backref('favorited_by', lazy='dynamic'))
