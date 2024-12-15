#!/bin/bash
python Main.py < input.txt >/opt/output.txt 2> /opt/compile_errors.txt
if [ -s /opt/compile_errors.txt ]; then 
    cat /opt/compile_errors.txt
else
    cat /opt/output.txt
fi
