FROM scratch

COPY server/build/main /server
COPY client/build /client/build
ENV PORT 3000
EXPOSE 3000

CMD ["/server"]
