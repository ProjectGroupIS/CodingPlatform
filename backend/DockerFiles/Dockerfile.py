FROM python:latest
WORKDIR /
COPY Main.py input.txt /
COPY entrypoints/entrypointPy.sh .
RUN chmod +x entrypointPy.sh
ENTRYPOINT [ "./entrypointPy.sh" ]