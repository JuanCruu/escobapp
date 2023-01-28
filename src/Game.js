import React from "react";
import CardImg from './imgs/card.png' 
import table from './imgs/table.jpg' 
export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: [],
            table: [],
            loading: true,
        };
    }

    componentDidMount = () => {
        this.startGame(this.createDeck());
    };

    createDeck = () => {
        let types = ["espadas", "copas", "oro", "basto"];
        let deck = [];
        types.forEach((index, type) => {
            deck.push(this.getCard(type, index));
        });

        deck = deck.flat().sort(() => Math.random() - 0.5);
        // this.setState({ deck })
        return deck;
    };

    getCard = (index, type) => {
        let cards = [];
        let maxCart = 10;
        for (let i = 1; i <= maxCart; i++) {
            let card = {
                type: type,
                number: i,
            };
            cards.push(card);
        }
        return cards;
    };

    startGame = (deck) => {
        let player = {
            hand: [],
            point: 0,
        };
        let cpu = {
            hand: [],
            point: 0,
        };
        let table = [];
        let aux = 0;
        for (let index = 1; index < 18; index++) {
            if (aux > 2) {
                aux = 0;
            }
            if (index < 3) {
                player.hand[aux] = this.distributeCards(deck);
            } else if (index < 6) {
                cpu.hand[aux] = this.distributeCards(deck);
            } else {
                table[aux] = this.distributeCards(deck);
            }
            aux++;
        }
          player.hand[aux] = this.distributeCards(deck);
        let loading = false;
        this.setState({ loading, player, cpu, table, deck });
    };

    distributeCards = (deck = this.state.deck) => {
        let card = deck.shift();
        return card;
    };
    getImg =()=>{

        let img = require("./imgs/card.png")
        img = URL.createObjectURL(CardImg)
        console.log(img);
        return null
    }
    render() {
        console.log(this.state);
        return (
            <>
                <div className="w-full h-screen  p-2">
                    {this.state.loading ? 
                        <>loading</>
                     : 
                     <div className="w-full bgea-table h-100 ">
                        <img src = {table}  alt="card" className={`absolute w-full h-full `} ></img>

                            <div className=" flex justify-center ml-12 items-center flex-col gap-10 ">
                                <div className="flex gap-2">
                                    {this.state.cpu.hand.map((card,index) =>{
                                        return <div className="w-40  relative  h-60" key={"cpuCard"+index}>
                                            <div className="absolute ml-7 mt-4">{card.number}</div>
                                            <img src = {CardImg}  alt="card" className={`${card.number % 2===0 && " mb-2  relative rotate-180"}`} ></img>
                                            <div className="absolute ml-12 bottom-40 z-20"> {card.type}</div>
                                            <div className="absolute right-7 rotate-180 bottom-10">{card.number}</div>
                                            

                                        
                                        </div>
                                    })}
                                </div>
                            
                                <div className=" flex gap-2">
                                    {this.state.table.map((card,index) =>{
                                        return <div className="w-40 rounded relative  h-60" key={"cpuCard"+index}>
                                            <div className="absolute ml-7 mt-4">{card.number}</div>
                                            <img src = {CardImg}  alt="card" className={`${card.number % 2===0 && " mb-2  relative rotate-180"}`} ></img>
                                            <div className="absolute ml-12 bottom-40 z-20"> {card.type}</div>
                                            <div className="absolute right-7 rotate-180 bottom-10">{card.number}</div>
                                        
                                        </div>
                                    })}
                                </div>
                                <div className="flex gap-2">
                                    {this.state.player.hand.map((card,index) =>{
                                        return <div className="w-40 rounded relative  h-60" key={"cpuCard"+index}>
                                            <div className="absolute ml-7 mt-4">{card.number}</div>
                                            <img src = {CardImg}  alt="card" className={`${card.number % 2===0 && " mb-2  relative rotate-180"}`} ></img>
                                            <div className="absolute ml-12 bottom-40 z-20"> {card.type}</div>
                                            <div className="absolute right-7 rotate-180 bottom-10">{card.number}</div>
                                        
                                        </div>
                                    })}
                                </div>
                            </div>
                     </div>
                        
                    }
                    
                </div>
            </>
        );
    }
}
