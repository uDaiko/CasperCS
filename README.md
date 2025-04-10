# CasperCS
This project is designed to be an easy as possible to use portfolio tracker. It was built as a fullstack application with NuxtJS and a PostgreSQL backend.
The site can be found here https://caspercs.onrender.com/
## Important Note!
The project is still a work in progress with many things planned. It is operating with low credit apis and as a result can be slow at times when too many requests are sent. 
## Roadmap
The following things I have planned for now:
- Caching strategy -  Currently the api is fetched one too many times. I will implement a caching strategy that makes the application only fetch when change is detected, which should result in a better performance too.
- CRUD for portfolios -  portfolios can currently only be inserted and read. Edit and Delete features will be added here shortly.
- Cascading Delete -  relevant for the previous point, due to foreign key constraints(and just generally a clean db) a cascading delete functionality is needed so that all assets related to a portfolio will be deleted too.
- UI/UX improvement - The asset table and some submenus will be overhauled
- Guest User -  The guest user credentials are currently handled by the client. Currently not a problem, but to prevent request abuse once the api limits are actually upgraded this needs to be fixed
