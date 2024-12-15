FROM gcc:latest
WORKDIR /
COPY Main.cpp input.txt /
COPY entrypoints/entrypointCpp.sh .
RUN g++ -o a Main.cpp 2> /opt/compile_errors.txt || exit 0
RUN chmod +x entrypointCpp.sh
ENTRYPOINT [ "./entrypointCpp.sh" ]