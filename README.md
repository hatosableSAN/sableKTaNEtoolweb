[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
# Create a Java Web Application using Embedded Tomcat

This tutorial will show you how to create a simple Java web application using embedded Tomcat.

## Prerequisites

* Basic Java knowledge, including an installed version of the JVM and Maven.
* Basic Git knowledge, including an installed version of Git.
* A Java web application. If you don't have one follow the first step to create an example. Otherwise skip that step.

## Skip The Application Creation

If you want to skip the creation steps you can clone the finished sample and then skip to the 'Deploy Your Application to Heroku' section:

```
$ git clone git@github.com:heroku/devcenter-embedded-tomcat.git
```

## Follow the Guide

If you would like to create the application yourself, then follow the Dev Center guide on how to [Create a Java Web Application using Embedded Tomcat](https://devcenter.heroku.com/articles/create-a-java-web-application-using-embedded-tomcat).


# how to run local

mvn package

からの

sh target/bin/webapp

-- または Spring Boot で起動 --

mvn spring-boot:run

もしくは

mvn package
java -jar target/embeddedTomcatSample-1.0-SNAPSHOT.jar

（Heroku 環境変数 `PORT` を参照します）

-- Docker (local) --

# Build
docker build -t embeddedtomcatsample:latest .

# Run
docker run -p 8080:8080 -e PORT=8080 embeddedtomcatsample:latest

-- CI --

A basic GitHub Actions workflow has been added at `.github/workflows/ci.yml` to build the project and (optionally) build a Docker image.