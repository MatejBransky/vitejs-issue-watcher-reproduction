import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Post } from "./components/Post";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: (ctx) => fetch(ctx.queryKey).then((response) => response.json()),
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Post id="1" />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
