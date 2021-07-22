fuser -k 8000/tcp
mvn package
cd target/
nohup java -jar yourlure-0.0.1-SNAPSHOT.jar &