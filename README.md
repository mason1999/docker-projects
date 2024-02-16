# Prerequisites

WSL users might need to run the command:

    sudo chmod 666 /var/run/docker.sock

# Structure of repo

The root folder of this repo houses directories. The directories represent different projects. Each project houses within:

1. A manual way of orchestrating containers to provision appalications.
1. An automated way of orchestrating containers to provision applications.

This is so people who clone the repository down can **see** the magic that goes behind `docker compose` and know that you can actually achieve the same result with docker commands.

# Summary of usage of dockerfile manual projects

- To create and run the containers run `orchestrate-containers.sh -c`.
- To stop and delete the containers run `orchestrate-containers.sh -d`.

# Summary of usage of docker compose projects

- To create and run the containers run `docker compose up`.
- To stop and delete the containers run `docker compose down`.
