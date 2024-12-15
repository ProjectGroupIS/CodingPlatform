#!/bin/bash

if [ -s opt/compile_errors.txt ]; then 
    cat opt/compile_errors.txt
else
    java Main < input.txt > /opt/output.txt; 
    cat opt/output.txt
# else cat /opt/compile_errors.txt
fi