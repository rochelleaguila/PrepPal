
import os
from flask_admin import Admin
from ..api.models import db, User
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')


    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(UserModelView(User, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))

class UserModelView(ModelView):
    column_list = ('username', 'email', 'created_at')  # Customize columns displayed
    form_columns = ('username', 'email', 'password_hash')  # Customize form fields
    column_searchable_list = ['username', 'email']  # Enable search functionality
    column_filters = ['username']  # Enable filters


'''
class SecureModelView(ModelView):
    #def is_accessible(self):
        # Implement your logic to check if the current user is authorized
        # For example, checking if a user is logged in and is an admin:
        #return current_user.is_authenticated and current_user.is_admin

    #def inaccessible_callback(self, name, **kwargs):
        # Redirect unauthorized users
        #return redirect(url_for('auth.login', next=request.url))

        admin.add_view(UserModelView(User, db.session, category='User Management'))
        admin.add_view(ModelView(AnotherModel, db.session, category='Data Management'))

'''
