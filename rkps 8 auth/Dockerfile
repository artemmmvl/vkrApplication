FROM openjdk:17-jdk-slim

WORKDIR /app

COPY ./build/libs/auth_rscir7-0.0.1-SNAPSHOT.jar /app/application.jar
EXPOSE 8081

CMD ["java", "-jar", "/app/application.jar"]
