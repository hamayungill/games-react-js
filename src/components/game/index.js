import React, {useState, useEffect, useRef} from 'react'

const Game = () => {
    
    const d1 = useRef(null)
    const d2 = useRef()
    const d3 = useRef()
    const d4 = useRef()
    const d5 = useRef()
    const d6 = useRef()
    const d7 = useRef()
    const d8 = useRef()
    const d9 = useRef()

    const [ list, setList] = useState({})
    const [turn, setTurn] = useState(false)
    const [boxClicked, setBoxClicked] = useState(null)
    const [winner, setWinner] = useState()

    useEffect(()=>{
        if(!winner){
            boxHandler()
        }
    },[boxClicked])

    const boxHandler = () => {

        if(!list[boxClicked]){
            let turnValue = turn? "X": "O"
            list[boxClicked] = turnValue
            if(boxClicked === 1) {
                d1.current.innerText = turnValue
            }else  if(boxClicked === 2) {
                d2.current.innerText = turnValue
            }else  if(boxClicked === 3) {
                d3.current.innerText = turnValue
            }else  if(boxClicked === 4) {
                d4.current.innerText = turnValue
            }else  if(boxClicked === 5) {
                d5.current.innerText = turnValue
            }else  if(boxClicked === 6) {
                d6.current.innerText = turnValue
            }else  if(boxClicked === 7) {
                d7.current.innerText = turnValue
            }else  if(boxClicked === 8) {
                d8.current.innerText = turnValue
            }else  if(boxClicked === 9) {
                d9.current.innerText = turnValue
            }else {}
            if(declareWinner()){
                setWinner(turn? "X": "O")
            }else{
                setTurn((prevState)=> !prevState)
            }
        }
    }

    const turnHandler = (val) => {
        setBoxClicked(val)
    }

    const declareWinner = () => {
        let patterns = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]]
        let result = false
        patterns.map((e)=>{
            let turnValue = turn ? "X": "O"
            if(list[e[0]] === turnValue && list[e[1]]  === turnValue && list[e[2]]  === turnValue ){
                result= true
            }
        })
        return result
    }

    return(
        <>
            <h1>Tic Tac Toe</h1>
            <div className="game">
                <div onClick={()=>{turnHandler(1)}}><p ref={d1} className="txt"></p></div>
                <div onClick={()=>{turnHandler(2)}}><p ref={d2} className="txt"></p></div>
                <div onClick={()=>{turnHandler(3)}}><p ref={d3} className="txt"></p></div>
                <div onClick={()=>{turnHandler(4)}}><p ref={d4} className="txt"></p></div>
                <div onClick={()=>{turnHandler(5)}}><p ref={d5} className="txt"></p></div>
                <div onClick={()=>{turnHandler(6)}}><p ref={d6} className="txt"></p></div>
                <div onClick={()=>{turnHandler(7)}}><p ref={d7} className="txt"></p></div>
                <div onClick={()=>{turnHandler(8)}}><p ref={d8} className="txt"></p></div>
                <div onClick={()=>{turnHandler(9)}}><p ref={d9} className="txt"></p></div>
            </div>
            {
                winner && ( <h2>{`${winner} is Winner !!!`}</h2>)
            }
        </>
            
        
    )   
}

export default Game