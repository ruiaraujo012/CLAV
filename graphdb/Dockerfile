FROM openjdk:8-jdk

ARG version=8.10.1

ENV GRAPHDB_PARENT_DIR=/opt/graphdb
ENV GRAPHDB_HOME=${GRAPHDB_PARENT_DIR}/home

ENV GRAPHDB_INSTALL_DIR=${GRAPHDB_PARENT_DIR}/dist

ADD graphdb-free-${version}-dist.zip /tmp

RUN mkdir -p ${GRAPHDB_PARENT_DIR} && \
    cd ${GRAPHDB_PARENT_DIR} && \
    unzip /tmp/graphdb-free-${version}-dist.zip && \
    rm /tmp/graphdb-free-${version}-dist.zip && \
    mv graphdb-free-${version} dist && \
    mkdir -p ${GRAPHDB_HOME}

COPY clav /opt/graphdb/home/data/repositories/clav

ENV PATH=${GRAPHDB_INSTALL_DIR}/bin:$PATH

CMD ["/opt/graphdb/dist/bin/graphdb", "-Dgraphdb.home=/opt/graphdb/home"]

#ENTRYPOINT ["/opt/graphdb/dist/bin/graphdb"]

EXPOSE 7200
