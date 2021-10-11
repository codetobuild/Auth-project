const startupApplication = (app) => {
  // server setup
  const PORT = process.env.PORT;

  const server = app.listen(PORT, () => {
    console.log(`connected at ${PORT}`);
  });

  // handle unhandled Rejection error and close process
  process.on("unhandledRejection", (err, promise) => {
    console.log(`Erro: ${err}`);
    server.close(() => process.exit(1));
  });
};

module.exports = startupApplication;
