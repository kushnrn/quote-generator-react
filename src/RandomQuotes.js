import React, { useContext, useEffect, useRef } from "react";
import { QuotesContext } from "./QuotesProvider";
import "./index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
library.add(faTwitter, faCopy, faQuoteLeft);

/**
 * The component selects a random quote from the list and displays it on the screen.
 */
export default function RandomQuotes() {
  const { data, error, quoteText, author, fadeProp, buttonStyle, bodyStyle, setColor, setQuoteText, setAuthor, setFadeProp, colors, currentColor } = useContext(QuotesContext);

  /** 
   * The ref is used to access the 'Twitter' button node directly and to set its attributes later. 
   * */
  const ref = useRef(null);

  /**
   * The function selects a random quote from the list if the fetch is successful.
   * It returns the information about the error in case of error.
   */
  function getRandomQuote() {
    if (error) return console.error(error.message);
    return data.quotes[
      Math.floor(Math.random() * data.quotes.length)
    ];
  }

  /**
   * The function displays the quote and its author on the screen and sets its styles and animation.
   */
  function getQuote() {
    let randomQuote = getRandomQuote();
    setTimeout(() => setColor(Math.floor(Math.random() * colors.length)), 1000);
    setFadeProp('fade-out');
    setTimeout(() => {
      setQuoteText(randomQuote.quote);
      setAuthor(randomQuote.author);
      setFadeProp('fade-in');
    }, 1000)
  }

  /**
   * The function copies the quote to the clipboard.
   */
  function copyClipboard() {
    navigator.clipboard.writeText(`'${quoteText}' -${author}`);
  }

  /** 
   * After rendering, we set attributes to the Twitter button, so that a user can repost it.
   */
  useEffect(() => {
    ref.current.setAttribute('href',
    'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + quoteText + '" ' + author));
    return () => ref.current.removeAttribute('href',
    'https://twitter.com/intent/tweet?text=' +
    encodeURIComponent('"' + quoteText + '" ' + author));
  }, [quoteText, author])

  /**
   * When the 'new-quote' button is pressed, a new quote generates.
   */
  useEffect(() => {
    const targetQuote = document.getElementById('new-quote');
    targetQuote.addEventListener('click', getQuote);
    return () => targetQuote.removeEventListener('click', getQuote);
  })

  /**
   * Setting the background style to the body.
   */
  useEffect(() => {
    document.body.style.backgroundColor = colors[currentColor];
    return () => {
      document.body.style.backgroundColor = colors[currentColor];
    };
  }, [currentColor])
  
  /**
   * When the 'copy' button is clicked, the quote is copied to the clipboard.
   */
  useEffect(() => {
    const copyButton = document.getElementById('copy');
    copyButton.addEventListener('click', copyClipboard);
    return () => {
      copyButton.removeEventListener('click', copyClipboard);
    }
  })

  return (
    <div className="container-fluid" style={bodyStyle}>
      <div id="quote-box">
        <div id="quote-text">
          <FontAwesomeIcon icon={["fas", "quote-left"]} />
          <span className={fadeProp} id="text">{' ' + quoteText}</span>
        </div>
        <div id="quote-author"> 
          <span className={fadeProp} id="author">{author}</span>
        </div>
        <div className="buttons">
          <a
            ref={ref}
            className="button"
            style={buttonStyle}
            id="tweet-quote"
            title="Tweet this quote!"
            target="_blank"
          >
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </a>
          <a className="button"  style={buttonStyle} id="copy">
            <FontAwesomeIcon icon={["fas", "copy"]} />
          </a> 
          <button className="button"
          style={buttonStyle}
          id="new-quote">New quote</button>
        </div>
      </div>
      <div className="footer">by Anastasiia Kushnirenko</div>
    </div>
  )
}