# Dockerfile for the Spring Boot Backend

# Step 1: Use a Maven image to build the project
FROM maven:3.8.4-openjdk-17 as build
WORKDIR /app

# Copy only the files needed for dependency resolution and install dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Step 2: Use an OpenJDK image to run the application
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the backend port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]