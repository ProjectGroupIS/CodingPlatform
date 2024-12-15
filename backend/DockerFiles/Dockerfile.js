FROM node:latest
WORKDIR /
COPY Main.js input.txt /
COPY entrypoints/entrypointJs.sh .
RUN chmod +x entrypointJs.sh
ENTRYPOINT [ "./entrypointJs.sh" ]