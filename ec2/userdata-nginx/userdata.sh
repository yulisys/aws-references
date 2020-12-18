#!/bin/bash
yum install -y amazon-linux-extras
amazon-linux-extras enable nginx1.12
yum install nginx -y
systemctl start nginx
