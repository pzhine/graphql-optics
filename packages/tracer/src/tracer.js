// @flow

export function logEntry({
  request,
  metrics,
}: {
  request: Object,
  metrics: Object,
}) {
  const metrics_conv = { ...metrics };
  metrics_conv.execution.resolvers = metrics_conv.execution.resolvers.map(
    res => ({
      ...res,
      path: res.path.map(p => p.toString()),
    }),
  );
  return {
    rootQuery: request.definitions[0].selectionSet.selections[0].name.value,
    graphql: request.graphql,
    metrics: metrics_conv,
  };
}
