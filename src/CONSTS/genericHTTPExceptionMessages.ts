export const genericHTTPExceptionMessages = [
  {
    status: 403,
    message:
      'Forbidden! The request contained valid data and was understood by the server, but the server is refusing action. This may be due to the user not having the necessary permissions for a resource or needing an account of some sort, or attempting a prohibited action (e.g. creating a duplicate record where only one is allowed).',
  },
  {
    status: 502,
    message:
      'Bad Gateway! The server was acting as a gateway or proxy and received an invalid response from the upstream server.',
  },
];
