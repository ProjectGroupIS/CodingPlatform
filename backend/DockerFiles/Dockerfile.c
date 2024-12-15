FROM gcc:latest
WORKDIR /
COPY Main.c input.txt /
COPY entrypoints/entrypointC.sh .
RUN gcc -o a Main.c 2> /opt/compile_errors.txt || exit 0
RUN chmod +x entrypointC.sh
ENTRYPOINT [ "./entrypointC.sh" ]