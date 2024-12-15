#!/bin/bash
if [ -s opt/compile_errors.txt ]; then 
    cat opt/compile_errors.txt
else
    ./a < input.txt > /opt/output.txt; 
    cat opt/output.txt
fi