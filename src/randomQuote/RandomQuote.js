import React, { Component } from 'react';
import './RandomQuote.css';


export default class RandomQuote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            author: null,
        }
    }

    /* ----------------------------------- fetch Data function ---------------------------------- */
    fetchData = async () => {
        try {
            const response = await fetch('https://api.quotable.io/quotes/random');
            const [data] = await response.json();
            console.log(data.content)
            this.setState({
                content: data.content,
                author: data.author,
            })
        } catch (error) {
            console.log(error)
        }
    }
    /* ----------------------------------- Get API data on start.---------------------------------- */
    componentDidMount() {
        this.fetchData()
    }
    /* ---------------------------------- Handle getting a new quote. ---------------------------------- */
    handleChangeQuote = () => {
        this.fetchData()
    }

    /* ----------------------------------- Get the content to post on Twitter. ---------------------------------- */
    getContentToPost = () => {
        const { content, author } = this.state;
        const tweet = `${content} - ${author} #Quote`
        const linkTweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`
        return linkTweet
    }


    render() {
        console.log(this.state.content)
        return (
            <div className='box'>
                <h1>Random Quote</h1>
                <div id='quote-box'>
                    <div className="quote-text">
                       <span> <i className="fa-solid fa-quote-left" /></span>
                        <p id="text">{this.state.content}</p>
                    </div>
                    <div id="author">- {this.state.author}</div>
                    <div className="buttons">
                        <a id="tweet-quote" href={this.getContentToPost()} target='_blank'>
                            <i className="fa-brands fa-x-twitter" />
                        </a>
                        <button id="new-quote" onClick={this.handleChangeQuote}>New Quote</button>
                    </div>
                </div>
                <p className='footer'>by <a href="https://github.com/Son-Tr" target='_blank'>Son-Tr</a></p>
            </div>
        )
    }
}
