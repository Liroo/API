#!/bin/bash

#
# Copyright (c) 2016 by Challenge Me - Pierre Monge <liroo.pierre@gmail.com>. All Rights Reserved.
#

# There it is, bash script!

# > Hello, I'm Pierre. Welcome in the API of Challenge Me (name of the project 01/11/2016)
#   If you found this repository, this script, files copyrighted as : '© 2016 by Challenge Me - Pierre Monge <liroo.pierre@gmail.com>'. AllRights Reserved. Thanks to contact the associated email :)

# Script could be used to run server, either run docker server or run server with correct env, we have to see

while getopts ":a" opt; do
  case $opt in
    a)
      echo "-a was triggered!" >&2
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      ;;
  esac
done
