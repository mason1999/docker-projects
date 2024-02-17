#! /usr/bin/bash

create() {
    # Create the network
    docker network create "home"
    
    # Create a managed volume.
    docker volume create "vol1"

    # Database
    docker build -t "mongodb_image" -f "./database/Dockerfile" "./database"
    docker run -itd --network "home" -p 2800:27017 --name "mongodb_container" -v "vol1":/data/db "mongodb_image"

    # Backend
    docker build -t "backend_image" -f "./backend/Dockerfile" "./backend"
    docker run -itd --network "home" -p 3500:4000 --name "backend_container" "backend_image"

    # Frontend
    docker build -t "frontend_image" -f "./frontend/Dockerfile" "./frontend"
    docker run -itd --network "home" -p 3600:3000 --name "frontend_container" "frontend_image"
}

delete() {
    # Database
    docker stop "mongodb_container"
    docker rm "mongodb_container"
    docker rmi "mongodb_image"


    # Backend
    docker stop "backend_container"
    docker rm "backend_container"
    docker rmi "backend_image"

    # Frontend
    docker stop "frontend_container"
    docker rm "frontend_container"
    docker rmi "frontend_image"

    # Volume
    docker volume rm "vol1"

    # Network
    docker network rm "home"
}

#################### BEGIN SCRIPT ####################
getopts "cdh" option
case $option in
    c)
    create
    ;;

    d)
    delete
    ;;

    ?)
    cat << 'EOF'
Illegal option entered. The available options [-c|-d] are:
    -c: Creating and running images and containers
    -d: Stopping and removing images and containers

In the script, we don't use getopts in a while loop. Hence only the first option will be recognized. That is:
    <script name> -cda: -c will be seen as the parameter
    <script name> -dac: -d will be seen as the parameter
    <script name> -acd: -a will be seen as the parameter
EOF
    ;;
esac
