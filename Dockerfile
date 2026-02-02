# Multi-stage Dockerfile for building and running the Spring Boot application
FROM maven:3.9.4-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -DskipTests package -q

FROM eclipse-temurin:21-jre
WORKDIR /app
# use the renamed artifact produced by the build
COPY --from=builder /app/target/sable-ktane-tool.jar app.jar
EXPOSE 8080
ENTRYPOINT ["sh","-c","java -Dserver.port=$PORT -jar /app/app.jar"]
