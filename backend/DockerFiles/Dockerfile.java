FROM amazoncorretto:latest
WORKDIR /
COPY Main.java input.txt /
COPY entrypoints/entrypointJava.sh .
RUN javac Main.java 2> /opt/compile_errors.txt || exit 0
RUN chmod +x entrypointJava.sh 
ENTRYPOINT [ "./entrypointJava.sh" ]
# CMD if [ -f Main.class ]; then java Main <input.txt > /opt/output.txt; fi
# CMD ["if","[-f Main.class];","then", "sh", "-c", "java Main < input.txt > /opt/output.;","fi" ]