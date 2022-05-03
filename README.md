## PickMe

## Installation

First you need to run `npm install` to install node_modules. 
After installation is done,
configure your database settings in `.env` file, there's also some more essential settings and parameters. Then run `npm start`
to start your server!

## Documentation

`Endpoints description:`

All DTOs can be found in src/dtos

`/auth/login` POST: takes username and password object. If login is successful returns object of JWT key with role email and name properties in it. And user object.

`/auth/registration` POST: takes userRequestDto style data and appends user to the database. Email must be unique.

`/companies` POST: (requires JWT token with role: ADMIN) takes companyRequestDto style data and appends new company to the database.

`/companies/:name` GET: (requires JWT token with role: ADMIN) return all info about company with that name.

`/user` GET: (requires JWT token with role: ADMIN) return all users from database.

`/user/:id` GET: (requires JWT token with role: ADMIN) return one user with a specific ID.

`/user/updateCompanyKey` POST: (requires JWT token with role: ADMIN/MANAGER) update user company key.

`/user/updateDriverRole` POST: (requires JWT token with role: ADMIN/MANAGER) update user role to DRIVER.

`/user/updateRole` POST: (requires JWT token with role: ADMIN) update user role for one of ENUM roles that available in src/enums folder

``

## Authors

Main and only developer Kuzhdenko Maksim [gitLab](https://gitlab.com/Alama1)