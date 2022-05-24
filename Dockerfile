# non root user example for alpine
#
# usage:
# $ docker build --build-arg "USER=someuser" --tag test .
# $ docker run --rm test

FROM node:18.0.0-alpine3.15

ARG USER=default-user
ENV HOME /home/$USER

# install sudo as root
RUN apk add --update sudo

# add new user
RUN adduser -D $USER \
        && echo "$USER ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USER \
        && chmod 0440 /etc/sudoers.d/$USER

USER $USER
WORKDIR $HOME/frontend
COPY . .
RUN sudo npm install
RUN sudo npm run build
RUN sudo chown -R $USER:$USER $HOME
RUN sudo npm run test

CMD echo "User $(whoami) running from $PWD with premissions: $(sudo -l)"

EXPOSE 3000
ENTRYPOINT npm run dev

# files in /home/$USER to be owned by $USER
# docker has --chown flag for COPY, but it does not expand ENV so we fallback to:
# COPY src src
# RUN sudo chown -R $USER:$USER $HOME


