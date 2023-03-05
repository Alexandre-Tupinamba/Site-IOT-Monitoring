FROM httpd:latest

RUN apt-get update; 

RUN mkdir -p /site
COPY constants/ /site
COPY images/ /site/
COPY *.html /site/
COPY *.css /site/
COPY *.js /site/

RUN mv /site /usr/local/apache2/htdocs/
