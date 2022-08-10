import React from "react";
import RandomQuotes from"./RandomQuotes";
import QuotesProvider from './QuotesProvider'

/**
 * The component sits at the root of the tree. 
 * @returns components that make up the structure of the app – the component that generates quotes and the provider that keeps states of the whole app.
 */
export default function App() {
  return (
    <QuotesProvider>
      <RandomQuotes />
    </QuotesProvider>
  );
}