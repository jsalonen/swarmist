FROM scratch

COPY server/build/linux-amd64 /server
COPY client/build /client/build
ENV PORT 3000
EXPOSE 3000

CMD ["/server"]
