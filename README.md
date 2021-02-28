Steps to run the application:

1. cd dpd-ui
2. npm install
3. npm run build
4. cd ../dpd-backend
5. mkdir -p target/classes/public
6. cp -r ../dpd-ui/build/* target/classes/public/
7. ./mvnw package -DskipTests
8. cp target/dpd-backend-0.0.1-SNAPSHOT.jar src/main/docker
9. cd src/main/docker
10. sudo docker-compose up
11. http://localhost:8080