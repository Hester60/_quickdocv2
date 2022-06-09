#!/bin/bash
export .env

echo "Please wait until the end ...";

mongo <<EOF
   var cfg = {
        "_id": "rs",
        "version": 1,
        "members": [
            {
                "_id": 0,
                "host": "quickdoc_database_1:27017",
                "priority": 2
            },
            {
                "_id": 1,
                "host": "quickdoc_database_2:27017",
                "priority": 1
            },
            {
                "_id": 2,
                "host": "quickdoc_database_3:27017",
                "priority": 0
            }
        ]
    };
    rs.initiate(cfg, { force: true });
    rs.status();

    while (! db.isMaster().ismaster ) { sleep(1000) }
    use admin;
       admin = db.getSiblingDB("admin");
       admin.createUser(
         {
    	user: "$MONGO_INITDB_ROOT_USERNAME",
            pwd: "$MONGO_INITDB_ROOT_PASSWORD",
            roles: [ { role: "root", db: "admin" } ]
         });
         db.getSiblingDB("admin").auth("$MONGO_INITDB_ROOT_USERNAME", "$MONGO_INITDB_ROOT_PASSWORD");
         rs.status();
EOF
