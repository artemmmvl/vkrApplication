FROM openjdk:17-jdk-slim

WORKDIR /app

COPY ./build/libs/rschir5-0.0.1-SNAPSHOT.jar /app/application.jar
EXPOSE 8090

CMD ["java", "-jar", "application.jar"]
