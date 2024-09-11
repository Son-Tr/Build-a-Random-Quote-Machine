import React, { Component } from 'react';
import './RandomQuote.css';
import axios from 'axios';


export default class RandomQuote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            author: null,
        }
    }

    /* ----------------------------------- fetch Data function ---------------------------------- */
    fetchData = () => {

        const API_URL = 'https://api.breakingbadquotes.xyz/v1/quotes';
        axios.get(`${API_URL}`)
            .then((res) => {
                const [data] = res.data;
              //  console.log(data);
                this.setState({
                    content: data.quote,
                    author: data.author
                })
            })
            .catch((err) => {
                console.log(err);
            });

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
        // console.log(this.state.content)
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
                        <a id="tweet-quote" href={this.getContentToPost()} target='_blank'  rel="noreferrer" >
                            <i className="fa-brands fa-x-twitter" />
                        </a>
                        <button id="new-quote" onClick={this.handleChangeQuote}>New Quote</button>
                    </div>
                </div>
                <p className='footer'>by <a href="https://github.com/Son-Tr" target='_blank'  rel="noreferrer" >Son-Tr</a></p>
            </div>
        )
    }
}
