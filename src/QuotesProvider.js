import React, { createContext, useState } from "react";
import useFetch from "./FetchHook";

/**
 * Context is created to store state data in a single location, so there is no need to pass that data through a bunch of components.
 */
export const QuotesContext = createContext();

/**
 * The component that will be used to wrap the App with the provider.
 */
export default function QuotesProvider({children}) {
  const colors = [
    '#D773A2',
    '#07BB9C',
    '#A06AB4',
    '#E56997',
    '#BD97CB',
    '#FBC740',
    '#1966B0',
    '#F7B301',
    '#EB773E'
  ];

  const [ currentColor, setColor ] = useState(1);
  const [ quoteText, setQuoteText ] = useState('Life isn’t about getting and having, it’s about giving and being');
  const [ author, setAuthor ] = useState('Kevin Kruse');
  const [ fadeProp, setFadeProp ] = useState("fade-in");

  /**
   * Here the custom hook is used to make fetch requests within the components.
   */
  const { data, error } = useFetch('https://gist.githubusercontent.com/kushnrn/1582a11413f7d47089610f770f811cfe/raw/48fde62e222b2928f81284b75a1f5b8e9093dacb/quotes.json');

  const bodyStyle = {
    color: colors[currentColor]
  }

  const buttonStyle = {
    backgroundColor: colors[currentColor]
  }

   /**
   * The Provider is the App component’s parent, and it’s providing values in context. The App component’s children can obtain these values directly on their own.
   */
  return (
    <QuotesContext.Provider value={{ data, error, quoteText, author, fadeProp, bodyStyle, buttonStyle, currentColor, setColor, setQuoteText, setAuthor, setFadeProp, colors}}>
      {children}
    </QuotesContext.Provider>
  )
}