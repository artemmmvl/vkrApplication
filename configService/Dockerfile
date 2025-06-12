# Используем базовый образ JDK
FROM openjdk:17-jdk-slim

# Указываем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем JAR-файл приложения в контейнер
COPY build/libs/configService-0.0.1-SNAPSHOT.jar /app/config-server.jar

# Указываем команду запуска
ENTRYPOINT ["java", "-jar", "/app/config-server.jar"]

# Опционально можно указать порт, если нужен для документирования
EXPOSE 8888
