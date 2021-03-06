## How to auto deploy to vps with github actions

1. Create service on vps

  - First step, we need to install environment: npm, serve, java

  - We need to work into folder /home/ubuntu

  - Create sh file

    + Front end:
    ```sh
    sudo /usr/bin/serve -l 80 -s -n build
    ```
    + Back end:
    ```
    sudo /usr/bin/java -jar target/yourlure-0.0.1-SNAPSHOT.jar
    ```
  - Create .sh file and give permission to read

  - Create service for our application

    + Direct to system folder and create file .service:
    ```
    cd /etc/systemd/system
    nano yourlure-be.service
    ```

    + Paste and edit in []:
    ```
        [Unit]
        Description=My Webapp Java REST Service
        [Service]
        User=root
        # The configuration file application.properties should be here:

        #change this to your workspace
        WorkingDirectory=/home/ubuntu/[YOUR-FOLDER]

        #path to executable. 
        #executable is a bash script which calls jar file
        ExecStart=/home/ubuntu/[YOUR-FOLDER]/[SH-FILE-NAME].sh

        SuccessExitStatus=143
        TimeoutStopSec=10
        Restart=on-failure
        RestartSec=5

        [Install]
        WantedBy=multi-user.target
    ```


   + Setup service:
   ```
      sudo systemctl daemon-reload
      sudo systemctl enable yourlure-be.service
      sudo systemctl start yourlure-be
      sudo systemctl status yourlure-be
   ```


   + Show log:
   ```
      sudo journalctl -f -n 1000 -u yourlure-be
   ```



2. Create gihub action file (yml file)
```
  name: Java CI
  on:
    push:
      branches: [ MAIN-BACKEND ]
    pull_request:
      branches: [ MAIN-BACKEND ]
  jobs:
    build:
      runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up JDK 11
        uses: actions/setup-java@v2
        with:
          java-version: "11"
          distribution: "adopt"
      - name: Build with Maven
        run: |
          mvn -B clean package
      - name: Upload file jar
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          password: ${{ secrets.PASSWORD }}
          port: ${{ secrets.PORT }}
          # file want to copy
          source: "target"
          # the destination of file
          target: "/home/ubuntu"
      - name: Start service
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          password: ${{ secrets.PASSWORD }}
          port: ${{ secrets.PORT }}
          script: |
            sudo systemctl stop yourlure-be
            sudo sudo systemctl daemon-reload
            sudo systemctl start yourlure-be
```

Watch which service are eating ram:
```
ps aux --sort=-%mem | head
```

Restart postgresql when it eat too much ram:
```
sudo systemctl restart postgresql.service
```
Postgresql:

stop service:
```
systemctl stop postgresql
```
start service:
```
systemctl start postgresql
```
show status of service:
```
systemctl status postgresql
```
disable service(not auto-start any more)
```
systemctl disable postgresql
```
enable service postgresql(auto-start)
```
systemctl enable postgresql
```
