2 persons using the app
    1 -> users
    2 -> Admin | super user

USER
    *user can be able to see the task which the user created only
    *user only can update his task won't update others

ADMIN
    *can able to see all the users task which are users being created
    *can be able to upload files (Eg: banners,) (Cloudinary & Multer along with postgresDB)(Assets stores in Cloudinary And the urls on the postgresDB)

AUTHENTICATION
    *Should login to do opearation on the application
        * if using email & password to login | Sign up Then couldn't able use google sign in option with the same email (JWT & Middleware)


CLI
    *To connect docker to postgres db(nodejs-capstone)
        docker exec -it nodejs-capstone-project psql -U postgres -d nodejs-capstone

    *To create admin user 
        SELECT id,email,role
        FROM users;

        UPDATE users
        SET role='ADMIN'
        WHERE email='';

        SELECT id,email,role
        FROM users
        WHERE email='';